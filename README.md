# Nebulo Chat Embed

Add the Nebulo chat to any website with one script tag. The widget loads the chat from your hosted Nebulo server, so messages, accounts, and updates stay shared everywhere.

## Install

Replace `https://YOUR-CHAT-HOST.example` with the public URL of the server running this project:

```html
<script
  src="https://cdn.jsdelivr.net/gh/PrismX8/nebulo-chat-embed@main/embed.js"
  data-chat-host="https://YOUR-CHAT-HOST.example"
  defer
></script>
```

The versionless `@main` URL means embedders receive the newest widget automatically after the CDN refreshes. The actual chat itself is always loaded directly from your chat host at `/chat`.

## Options

Put this before the script tag to customize the launcher:

```html
<script>
  window.NebuloChatEmbed = {
    host: "https://YOUR-CHAT-HOST.example",
    path: "/chat",
    title: "Chat with us",
    accent: "#1683ff"
  };
</script>
```

`host` in this configuration takes precedence over `data-chat-host`.

## Publishing updates

Commit and push changes to the `main` branch. Existing websites do not need to change their embed code.

```bash
git add embed.js README.md
git commit -m "Update chat widget"
git push origin main
```

For a production chat host, serve this repository's `embed.js` with a short cache lifetime or use the jsDelivr URL above. Do not use a GitHub `raw` URL in customer sites.
