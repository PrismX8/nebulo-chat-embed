/* Nebulo Chat Embed — load this file from your site to add the chat launcher. */
(function () {
  "use strict";

  var currentScript = document.currentScript;
  var configuredHost = currentScript && currentScript.getAttribute("data-chat-host");
  var options = window.NebuloChatEmbed || {};
  var chatHost = String(options.host || configuredHost || "").replace(/\/$/, "");

  if (!chatHost) {
    console.error("Nebulo Chat Embed: add data-chat-host=\"https://your-chat-host.example\" to the script tag.");
    return;
  }

  var chatPath = options.path || "/chat";
  var title = options.title || "Open chat";
  var accent = options.accent || "#1683ff";
  var root = document.createElement("div");
  root.setAttribute("data-nebulo-chat-embed", "");
  document.body.appendChild(root);

  var shadow = root.attachShadow({ mode: "open" });
  shadow.innerHTML = [
    "<style>",
    ":host{all:initial}.launcher{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border:0;border-radius:50%;background:" + accent + ";color:#fff;cursor:pointer;box-shadow:0 12px 32px rgba(0,0,0,.28);font:700 24px/1 system-ui,sans-serif;z-index:2147483646}.launcher:hover{filter:brightness(1.08);transform:translateY(-1px)}.panel{position:fixed;right:20px;bottom:88px;width:min(420px,calc(100vw - 28px));height:min(680px,calc(100vh - 112px));border:0;border-radius:16px;overflow:hidden;background:#101014;box-shadow:0 20px 60px rgba(0,0,0,.42);z-index:2147483646}.panel[hidden]{display:none}.close{position:absolute;right:9px;top:9px;width:30px;height:30px;border:0;border-radius:50%;background:rgba(0,0,0,.55);color:#fff;cursor:pointer;font:700 20px/1 system-ui;z-index:2}.frame{width:100%;height:100%;border:0;background:#101014}@media(max-width:480px){.launcher{right:14px;bottom:14px}.panel{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0}}",
    "</style>",
    "<button class=\"launcher\" type=\"button\" aria-label=\"" + escapeHtml(title) + "\" aria-expanded=\"false\">✦</button>",
    "<section class=\"panel\" hidden aria-label=\"Nebulo chat\"><button class=\"close\" type=\"button\" aria-label=\"Close chat\">×</button><iframe class=\"frame\" title=\"Nebulo chat\" allow=\"clipboard-write; microphone; autoplay\"></iframe></section>"
  ].join("");

  var launcher = shadow.querySelector(".launcher");
  var panel = shadow.querySelector(".panel");
  var frame = shadow.querySelector(".frame");
  var loaded = false;
  function open() {
    if (!loaded) { frame.src = chatHost + chatPath; loaded = true; }
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
  }
  function close() { panel.hidden = true; launcher.setAttribute("aria-expanded", "false"); }
  launcher.addEventListener("click", function () { panel.hidden ? open() : close(); });
  shadow.querySelector(".close").addEventListener("click", close);
  window.addEventListener("keydown", function (event) { if (event.key === "Escape") close(); });

  function escapeHtml(value) {
    return String(value).replace(/[&<>\"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[character];
    });
  }
}());
