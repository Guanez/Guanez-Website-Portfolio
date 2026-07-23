# Project media

One folder per project, named by its `slug` in `lib/projects.ts`.

## Drop files here, then reference them in `lib/projects.ts`

Per folder (all optional except cover, once real):

| File               | Used by            | Notes                                                        |
| ------------------ | ------------------ | ------------------------------------------------------------ |
| `cover.jpg`        | carousel card      | The card image. Landscape, ~1200px wide. Set `cover:`.       |
| `demo.mp4`         | modal gallery      | Muted, looped screen recording. Keep it small (H.264, ~720p).|
| `demo-poster.jpg`  | modal video poster | First frame / thumbnail shown before the video plays.        |
| `shot-1.jpg` …     | modal gallery      | Screenshots. Any count. Add each as a `media[]` image entry. |

## How to wire it up

In `lib/projects.ts`, for the matching project:

```ts
cover: "/projects/tindapos/cover.jpg",   // swap the Unsplash placeholder
media: [
  { type: "video", src: "/projects/tindapos/demo.mp4",
    poster: "/projects/tindapos/demo-poster.jpg", alt: "TindaPOS checkout demo" },
  { type: "image", src: "/projects/tindapos/shot-1.jpg", alt: "Inventory dashboard" },
  { type: "image", src: "/projects/tindapos/shot-2.jpg", alt: "Sales analytics" },
],
```

Local paths (leading slash) need no `next.config` change. Remote images do.

## Video specs (keep the page fast)

Videos only load when a case-study modal opens — never on page load — so they're
cheap. Keep them tight so they stay that way:

- **Length:** 15–30s, one focused flow, loopable.
- **Resolution:** 720p (1280×720).
- **Codec:** H.264 MP4. **Bitrate:** ~1–2 Mbps. **No audio** (modal is muted).
- **File size:** under ~3–5 MB per clip.
- Always ship a `demo-poster.jpg` (first frame) alongside each `demo.mp4`.

Compress a raw recording to spec with ffmpeg:

```
ffmpeg -i raw.mov -vf "scale=1280:-2" -c:v libx264 -crf 26 -preset slow -an demo.mp4
```

`-an` strips audio; raise `-crf` to 28–30 if the file is still too big. Grab a
poster frame:

```
ffmpeg -i demo.mp4 -vf "select=eq(n\,0)" -frames:v 1 demo-poster.jpg
```

## Carousel card clip (optional)

The **active/center** carousel card can play a looping ambient clip via
`cardVideo` in `lib/projects.ts` (e.g. `/projects/<slug>/card.mp4`). Only the
active card plays — side cards stay static — so it's always one video at a time.

- Keep it even shorter and lighter than the demo: **6–12s, silent, seamless loop**,
  ideally under ~2 MB. It's ambience, not a walkthrough.
- Set a `cover` too — it's used as the clip's poster (shown before it loads).
- You can point `cardVideo` at the same `demo.mp4` if you don't want a separate clip.

Rule of thumb: card clips play one-at-a-time and stay small; the full walkthrough
belongs in the modal. Never autoplay all cards at once.
