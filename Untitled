function doGet(e) {
  // Todo
}

function doPost(e) {
  // Verifica se a chamada POST veio com dados no corpo e se os dados estão no formato correto
  if (e.postData.contents && e.postData.type == 'application/json') {
    // Caso existam dados eles virão em formato JSON e é necessário transformar estes dados para usá-los no aplicativo
    var lead = JSON.parse(e.postData.contents);

    // Chama uma função personalizada para gravar o lead na planilha
    gravarMensagem(lead);
  }
}

function gravarMensagem(mensagem) {
  // Abre a planilha e seleciona a aba Sheet1
  var celulas = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');

  // Seleciona as células que conterão o cabeçalho. Em ordem, os parâmetros são: primeira linha, primeira coluna, última linha, última coluna
  var cabecalho = celulas.getRange(1, 1, 1, 23);

  // Escreve os nomes das colunas nas células de cabeçalho
  //cabecalho.setValues([['id', 'first name', 'last name']]);
  cabecalho.setValues([['id',
  'status',
  'date_created',
  'date_modified',
  'discount_total',
  'shipping_total',
  'total',
  'customer_id',
  'customer_note',
  'billing.first_name + last_name',
  'billing.email',
  'billing.phone',
  'billing.cpf',
  'shipping.first_name + last_name',
  'shipping.address_1',
  'shipping.address_2',
  'shipping.number',
  'shipping.neighborhood',
  'shipping.city',
  'shipping.state',
  'shipping.postcode',
  'payment_method_title',
  'date_paid']]);

  // Cria uma trava que impede que dois ou mais usuários executem o script simultaneamente
  var trava = LockService.getScriptLock();

  // Espera 2 segundos até que as linhas de código a seguir terminem
  trava.waitLock(2000);

  var arrayLength = mensagem.length;

  // Navega pelos dados enviados pelo webhook
  /*for (var i = 0; i < arrayLength; i++) {

    // Escreve os dados na planilha
    celulas.appendRow([mensagem[i]["id"],
                       mensagem[i]["billing"]["first_name"],
                       mensagem[i]["billing"]["last_name"]]);

    // Atualiza a planilha com a nova linha
    SpreadsheetApp.flush();
  }*/

  // Escreve os dados na planilha
    /*celulas.appendRow([mensagem.id,
                       mensagem.billing.first_name,
                       "gol do peixao"]);*/
  celulas.appendRow([
      mensagem.id,
      mensagem.status,
      mensagem.date_created,
      mensagem.date_modified,
      mensagem.discount_total,
      mensagem.shipping_total,
      mensagem.total,
      mensagem.customer_id,
      mensagem.customer_note,
      mensagem.billing.first_name + " " + mensagem.billing.last_name,
      mensagem.billing.email,
      mensagem.billing.phone,
      mensagem.billing.cpf,
      mensagem.shipping.first_name  + " " + mensagem.shipping.last_name,
      mensagem.shipping.address_1,
      mensagem.shipping.address_2,
      mensagem.shipping.number,
      mensagem.shipping.neighborhood,
      mensagem.shipping.city,
      mensagem.shipping.state,
      mensagem.shipping.postcode,
      mensagem.payment_method_title,
      mensagem.date_paid
    ]);

    // Atualiza a planilha com a nova linha
    SpreadsheetApp.flush();

  // Desativa a trava do script para que possa receber outras mensagens do webhook
  trava.releaseLock();
}
