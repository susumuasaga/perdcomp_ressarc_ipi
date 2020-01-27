import mongoose from 'mongoose';
import fs from 'fs';
import util from 'util';
import createParticipanteModel from './createParticipanteModel';
import createNotaFiscalModel from './createNotaFiscalModel';
import createApuracaoIPIModel from './createApuracaoIPIModel';
import createRegistroIPIModel from './createRegistroIPIModel';
import readRange from './readRange';
import writeR11 from './writeR11';
import writeR12 from './writeR12';
import writeR13 from './writeR13';
import writeR15 from './writeR15';
import writeR21 from './writeR21';


mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

let participanteModel = createParticipanteModel();
let notaFiscalModel = createNotaFiscalModel();
let apuracaoIPIModel = createApuracaoIPIModel();
let registroIPIModel = createRegistroIPIModel();

async function clear() {
    await participanteModel.deleteMany({});
    await notaFiscalModel.deleteMany({});
    await apuracaoIPIModel.deleteMany({});
    await registroIPIModel.deleteMany({});
}

function load(anoInic: number, mesInic: number, anoFim: number, mesFim: number) {
    readRange(participanteModel, notaFiscalModel,
        apuracaoIPIModel, registroIPIModel,
        "/users/susum/baturros",
        anoInic, mesInic, anoFim, mesFim);
}

function writeAll(ano: number, mes: number) {
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
