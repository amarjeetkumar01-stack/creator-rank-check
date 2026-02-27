export default async function handler(req, res) {
  const email = req.query.email;

  const GOOGLE_SCRIPT_URL = "PASTE_SCRIPT_URL_HERE";

  try {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?email=${email}`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rank" });
  }
}
