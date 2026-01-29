import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cors());

const BASE_URL = process.env.BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

app.get("/api/tmdb/movie/popular", async (req, res) => {

    const url = new URL(`${BASE_URL}/movie/popular?language=fr-FR`)

    try {
        const fetchAPI = await fetch(url, {
            headers: {
                Authorization: ` Bearer ${API_TOKEN}`,
                accept: 'application/json'
            }
        });

        if (!fetchAPI.ok) throw new Error("Erreur TMDB" + fetchAPI.status);

        const response = await fetchAPI.json();

        res.json(response);
    } catch (error) {
        return res.status(500).json({ error: "Erreur proxy TMDB " + error.message });
    }

});

app.listen(3500, () => {
    console.log("Serveur démarrer sur le port http://localhost:3500");
});