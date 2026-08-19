# Estratégia de testes

## Objetivo

Validar os principais riscos do catálogo do Toolshop nas camadas de frontend e API, incluindo
a consistência dos dados exibidos entre as duas interfaces.

## Cobertura por risco

| Risco                                        | Cobertura                         | Prioridade |
| -------------------------------------------- | --------------------------------- | ---------- |
| Catálogo indisponível                        | listagem via API e frontend       | Alta       |
| Dados divergem entre UI e API                | cenário integrado de nome e preço | Alta       |
| Produto não é encontrado                     | pesquisa por nome                 | Alta       |
| Ordenação engana o cliente                   | preços em ordem crescente         | Média      |
| Recurso inexistente é tratado incorretamente | resposta `404`                    | Média      |

## Pirâmide e escopo

Este repositório cobre API, frontend E2E e um cenário de integração entre as camadas. Os testes
de API dão feedback rápido; o frontend protege a experiência do usuário; o teste integrado
garante que o contrato visto pelo cliente permanece coerente. Os testes `@smoke` bloqueiam
releases e `@regression` ampliam a cobertura em execução agendada.

## Critérios de qualidade

- seletores acessíveis ou `data-test`, evitando CSS frágil;
- locators, ações e cenários em camadas independentes;
- cenários Gherkin em inglês como especificação executável;
- testes independentes, paralelizáveis e sem ordem implícita;
- nenhuma espera fixa (`waitForTimeout`);
- API validada por status, cabeçalho e contrato básico;
- evidências apenas quando úteis: trace na repetição, vídeo e screenshot em falhas.
