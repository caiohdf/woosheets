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
  // var cabecalho = celulas.getRange(1, 1, 1, 24);
  //
  // // Escreve os nomes das colunas nas células de cabeçalho
  // //cabecalho.setValues([['id', 'first name', 'last name']]);
  // cabecalho.setValues([[
  //   'id',
  //   'status',
  //   'date_created',
  //   'date_modified',
  //   'discount_total',
  //   'shipping_total',
  //   'total',
  //   'customer_id',
  //   'customer_note',
  //   'billing.first_name + last_name',
  //   'billing.email',
  //   'billing.phone',
  //   'billing.cpf',
  //   'shipping.first_name + last_name',
  //   'shipping.address_1',
  //   'shipping.address_2',
  //   'shipping.number',
  //   'shipping.neighborhood',
  //   'shipping.city',
  //   'shipping.state',
  //   'shipping.postcode',
  //   'payment_method_title',
  //   'date_paid',
  //   'method_title'
  // ]]);

  // Cria uma trava que impede que dois ou mais usuários executem o script simultaneamente
  var trava = LockService.getScriptLock();

  // Espera 2 segundos até que as linhas de código a seguir terminem
  trava.waitLock(2000);

  var arrayLength = mensagem.length;

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
      mensagem.date_paid,
      mensagem.shipping_lines[0].method_title
    ]);


    Logger.log(mensagem.line_items);

    for (var i = 0; i < mensagem.line_items.length; i++) {
      celulas.appendRow([
        mensagem.line_items[i].name,
        mensagem.line_items[i].product_id,
        mensagem.line_items[i].variation_id,
        mensagem.line_items[i].quantity,
        mensagem.line_items[i].sku,
        mensagem.line_items[i].meta_data[0].id,
        mensagem.line_items[i].meta_data[0].key,
        mensagem.line_items[i].meta_data[0].value,
      ]);
    }

    var container = [];

    var a;

    a = container.push(mensagem.id);
    celulas.appendRow(container);

    /*
      line_items
      id, name, product_id, variation_id, quantity, meta_data (id, value), sku
    */

    // Atualiza a planilha com a nova linha
    SpreadsheetApp.flush();

  // Desativa a trava do script para que possa receber outras mensagens do webhook
  trava.releaseLock();
}
