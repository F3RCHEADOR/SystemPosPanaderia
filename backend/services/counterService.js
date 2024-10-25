import Counter from '../models/Counter.js'; // Asegúrate de ajustar la ruta

export const getNextConsecutivo = async () => {
    const counter = await Counter.findOneAndUpdate(
        { _id: 'pagoConsecutivo' }, // Identificador único para este contador
        { $inc: { sequence: 1 } },
        { new: true, upsert: true } // Crea el documento si no existe
    );
    return counter.sequence;
};
