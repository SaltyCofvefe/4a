const fs = require('fs');
const express = require('express');

const app = express();
const port = 5500;

const sanakirjaTiedosto = 'sanakirja.txt';

// Hakumetodi
app.get('/hae', (req, res) => {
    const sana = req.query.sana;
    const sanakirja = fs.readFileSync(sanakirjaTiedosto, 'utf8');
    const rivit = sanakirja.split('\n');
    for (let i = 0; i < rivit.length; i++) {
        const sanat = rivit[i].split(' ');
        if (sanat[0] === sana) {
            res.send(sanat[1]);
            return;
        }
    }
    res.send('Sanaa ei löytynyt.');
});

// Lisäysmetodi
app.post('/lisaa', (req, res) => {
    const sana = req.query.sana;
    const kaannos = req.query.kaannos;
    const rivi = `${sana} ${kaannos}\n`;
    fs.appendFileSync(sanakirjaTiedosto, rivi);
    res.send('Sana lisätty.');
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
    // http://localhost:5500/hae?sana=auto
});