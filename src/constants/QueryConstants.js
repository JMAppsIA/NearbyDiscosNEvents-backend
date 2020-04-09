module.exports = {
    CREAR_USUARIO: `INSERT INTO personas(pri_nomb,seg_nomb,pri_apel,seg_apel,nom_comp,tip_doc,num_doc,fec_nac,edad,telf,direc_per,genero_per) VALUES (:pri_nomb,:seg_nomb,:pri_apel,:seg_apel,:nom_comp,:tip_doc,:num_doc,:fec_nac,:edad,:telf,:direc_per,:genero_per)`,
    OBTENER_USUARIO: `SELECT pri_nomb FROM PERSONAS WHERE num_doc = :numeroDocumento`,
    ACTUALIZAR_USUARIO: `UPDATE personas SET pri_nomb = :pri_nomb, seg_nomb = :seg_nomb, pri_apel = :pri_apel, seg_apel = :seg_apel, nom_comp = :nom_comp, fec_nac = :fec_nac, edad = :edad, telf = :telf, direc_per = :direc_per, genero_per = :genero_per WHERE num_doc = :num_doc`

};
