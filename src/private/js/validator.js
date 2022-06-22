exports.valid_info_resgister = function (info){

    if((info.email).indexOf('@estudante.ifms.edu.br') == -1){       
         return false;
    }else if((info.username).length <= 3 ||  (info.password).length < 8){ 
        console.log("Erro 269");
        return false;
    }
    return true;
}