function readSingleFile(e) {
  const arquivo = e.target.files[0]
  if (!arquivo) {
    return;
  }
  const leitor = new FileReader()
  leitor.onload = function(e) {
    displayContents(e.target.result)
  }
  leitor.readAsText(arquivo)
}
  
function displayContents(contents) {
  const parser = new DOMParser();

  const xml = parser.parseFromString(contents, 'text/xml');

  const nomeURLXML = 'www.contoso.com';

  const produtosXML = xml.getElementsByTagNameNS(nomeURLXML, 'Item');

  const divResultados = document.getElementById('div-resultados')

  for (const produtoXml of produtosXML) {
    const pProdutoNome = document.createElement('p')
    const pProdutoQnt = document.createElement('p')
    const pProdutoPreco = document.createElement('p')
    const pProdutoComentario = document.createElement('p')
    const pProdutoEspaco = document.createElement('p')

    pProdutoNome.innerHTML = `Nome: ${produtoXml.querySelector('ProductName').textContent}`
    pProdutoQnt.innerHTML = `Quantidade: ${produtoXml.querySelector('Quantity').textContent}`
    pProdutoPreco.innerHTML = `Preço (em dólar): ${produtoXml.querySelector('USPrice')?.textContent || 0}`
    pProdutoComentario.innerHTML = `comentario: ${produtoXml.querySelector('Comment')?.textContent || ''}`
    pProdutoEspaco.innerHTML = '---------------------------------------------------------------------------'

    divResultados.append(pProdutoNome)
    divResultados.append(pProdutoQnt)
    divResultados.append(pProdutoPreco)
    divResultados.append(pProdutoComentario)
    divResultados.append(pProdutoEspaco)
  }
}
  
document.getElementById('file-input').addEventListener('change', readSingleFile, false);