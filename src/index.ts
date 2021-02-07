import app from "./app";

async function main() {

    /*
    await app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public/index.html'));
    });
*/
    app.listen(process.env.PORT, () => {
        console.log('Servidor Corriendo en puerto: ' + process.env.PORT);
    })
}

main();