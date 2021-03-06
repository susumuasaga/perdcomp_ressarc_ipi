mongoose = require("mongoose");
createNotaFiscalModel = (require("./dist/createNotaFiscalModel")
    .default);
createApuracaoIPIModel = (require("./dist/createApuracaoIPIModel")
    .default);
createParticipanteModel = (require("./dist/createParticipanteModel")
    .default);
createRegistroIPIModel = (require("./dist/createRegistroIPIModel")
    .default);
readRange = require("./dist/readRange").default;
writeR11 = require("./dist/writeR11").default;
writeR12 = require("./dist/writeR12").default;
writeR13 = require("./dist/writeR13").default;
writeR15 = require("./dist/writeR15").default;
writeR21 = require("./dist/writeR21").default;

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

participanteModel = createParticipanteModel();
notaFiscalModel = createNotaFiscalModel();
apuracaoIPIModel = createApuracaoIPIModel();
registroIPIModel = createRegistroIPIModel();

async function clear() {
    await participanteModel.deleteMany({});
    await notaFiscalModel.deleteMany({});
    await apuracaoIPIModel.deleteMany({});
    await registroIPIModel.deleteMany({});
}

function load(anoInic, mesInic, anoFim, mesFim) {
    readRange(participanteModel, notaFiscalModel,
        apuracaoIPIModel, registroIPIModel,
        "/users/susumuasaga/baturros",
        anoInic, mesInic, anoFim, mesFim);
}

function writeAll(ano, mes) {
    const entidade = {
        cnpj: '02352777000140', nome: '',
        paAno: ano, paMes: mes
    };
    writeR11(registroIPIModel, entidade);
    writeR12(registroIPIModel, entidade);
    writeR13(notaFiscalModel, entidade);
    writeR15(notaFiscalModel, entidade);
    writeR21(apuracaoIPIModel, entidade);
}

fs = require('fs');
util = require('util');

async function writeNFNT() {
    const notaFiscalDocs = await (notaFiscalModel
        .find({ participanteCNPJ: '11137711000129' })
        .exec())
    const out = fs.createWriteStream('NFsNT.txt');
    const writeAsync = util.promisify(out.write).bind(out);
    const endAsync = util.promisify(out.end).bind(out);
    for (let i = 0; i < notaFiscalDocs.length; i++) {
        const d = notaFiscalDocs[i];
        await writeAsync(`${d.num},`);
        await writeAsync(`${d.serie},`);
        await writeAsync(
            `${d.data.substring(4)}-${d.data.substring(2, 4)}-${d.data.substring(0, 2)},`
        );
        await writeAsync(
            `${d.dataES.substring(4)}-${d.dataES.substring(2, 4)}-${d.dataES.substring(0, 2)},`
        );
        await writeAsync(`${d.cfop},`);
        await writeAsync(`${d.total / 100},`);
        await writeAsync(`${d.ipiCredOuDeb / 100}`);
        await writeAsync('\r\n');
    }
    await endAsync();
}
