import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Guanez";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export async function GET() {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 }
      );
    }

    // GraphQL query to get user stats + contribution graph
    const query = `
      query($username: String!) {
        user(login: $username) {
          repositories(first: 100, ownerAffiliations: OWNER) {
            totalCount
            nodes {
              stargazerCount
            }
          }
          pullRequests(first: 1) {
            totalCount
          }
          contributionsCollection {
            totalCommitContributions
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const user = data.data.user;
    const totalStars = user.repositories.nodes.reduce(
      (acc: number, repo: { stargazerCount: number }) => acc + repo.stargazerCount,
      0
    );

    const stats = {
      repos: user.repositories.totalCount,
      commits: user.contributionsCollection.totalCommitContributions,
      stars: totalStars,
      prs: user.pullRequests.totalCount,
      contributions: user.contributionsCollection.contributionCalendar.totalContributions,
    };

    const weeks: ContributionWeek[] =
      user.contributionsCollection.contributionCalendar.weeks;

    return NextResponse.json({ stats, weeks });
  } catch (error) {
    console.error("GitHub API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
