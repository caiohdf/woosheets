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

  // Cria uma trava que impede que dois ou mais usuários executem o script simultaneamente
  var trava = LockService.getScriptLock();

  // Espera 2 segundos até que as linhas de código a seguir terminem
  trava.waitLock(2000);

  var arrayLength = mensagem.length;

  var container = [];
  var a;

  a = container.push(mensagem.id);
  a = container.push(mensagem.id);
  a = container.push(mensagem.status);
  a = container.push(mensagem.date_created);
  a = container.push(mensagem.date_modified);
  a = container.push(mensagem.discount_total);
  a = container.push(mensagem.shipping_total);
  a = container.push(mensagem.total);
  a = container.push(mensagem.customer_id);
  a = container.push(mensagem.customer_note);
  a = container.push(mensagem.billing.first_name + " " + mensagem.billing.last_name);
  a = container.push(mensagem.billing.email);
  a = container.push(mensagem.billing.phone);
  a = container.push(mensagem.billing.cpf);
  a = container.push(mensagem.shipping.first_name  + " " + mensagem.shipping.last_name);
  a = container.push(mensagem.shipping.address_1);
  a = container.push(mensagem.shipping.address_2);
  a = container.push(mensagem.shipping.number);
  a = container.push(mensagem.shipping.neighborhood);
  a = container.push(mensagem.shipping.city);
  a = container.push(mensagem.shipping.state);
  a = container.push(mensagem.shipping.postcode);
  a = container.push(mensagem.payment_method_title);
  a = container.push(mensagem.date_paid);
  a = container.push(mensagem.shipping_lines[0].method_titl);

  for (var i = 0; i < mensagem.line_items.length; i++) {
    container.push(mensagem.line_items[i].name);
    container.push(mensagem.line_items[i].product_id);
    container.push(mensagem.line_items[i].variation_id);
    container.push(mensagem.line_items[i].quantity);
    container.push(mensagem.line_items[i].sku);
    container.push(mensagem.line_items[i].meta_data[0].id);
    container.push(mensagem.line_items[i].meta_data[0].key);
    container.push(mensagem.line_items[i].meta_data[0].value);
  }

  celulas.appendRow(container);

  // Atualiza a planilha com a nova linha
  SpreadsheetApp.flush();

  // Desativa a trava do script para que possa receber outras mensagens do webhook
  trava.releaseLock();
}
