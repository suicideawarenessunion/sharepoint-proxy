export default async function handler(req, res) {
  const userAgent = req.headers["user-agent"] || "unknown";
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userId = "Anonymous"; // Specific sharing వాడితే Gmail/Outlook ID capture చేయొచ్చు

  // Power Automate Webhook కి info పంపడం
  await fetch("https://prod-xxx.logic.azure.com/.../webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: userId,
      ip: ip,
      agent: userAgent,
      time: new Date().toISOString(),
      file: "CC Footage Library"
    })
  });

  // Redirect to real SharePoint library
  res.writeHead(302, {
    Location: "https://messengersworld.sharepoint.com/:f:/s/POSTSAU2/EmBJ9Sw9dANAg_uWKjfMnJUB0_BGPcz6LENAMYODw-f1fQ"
  });
  res.end();
}
