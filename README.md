# Playwright Quality Portfolio

[![Playwright Tests](https://github.com/raphaelmanzolli/playwright-toolshop-automatio/actions/workflows/playwright.yml/badge.svg)](https://github.com/raphaelmanzolli/playwright-toolshop-automatio/actions/workflows/playwright.yml)

Portfólio de automação para o e-commerce educacional
[Practice Software Testing (Toolshop)](https://practicesoftwaretesting.com/). O mesmo produto
oferece [frontend e API REST documentada](https://api.practicesoftwaretesting.com/api/documentation),
permitindo demonstrar testes de UI, API e integração com Playwright e TypeScript.

## O que este projeto demonstra

- frontend em Chromium, Firefox, WebKit e viewport mobile;
- API REST com validações de status, headers e contrato básico;
- cenário integrado que compara dados da API com o frontend;
- arquitetura separada em `locators`, `functions` e `tests`;
- executable scenarios written in English with Gherkin;
- fixtures tipadas e TypeScript em modo estrito;
- tags de execução, paralelismo e pipeline no GitHub Actions;
- HTML, JUnit, trace, vídeo e screenshot para diagnóstico.

## Cenários automatizados

| Camada     | Cenário                                  | Tag                        |
| ---------- | ---------------------------------------- | -------------------------- |
| Frontend   | pesquisa pelo nome                       | `@front @smoke`            |
| Frontend   | ordenação pelo menor preço               | `@front @regression`       |
| Frontend   | detalhes do produto                      | `@front @smoke`            |
| API        | listagem e contrato de produtos          | `@api @smoke`              |
| API        | consulta por ID                          | `@api @regression`         |
| API        | produto inexistente retorna 404          | `@api @negative`           |
| Integração | nome e preço consistentes entre API e UI | `@integration @regression` |

## Como executar

Pré-requisito: Node.js 20 ou superior.

```bash
corepack enable
pnpm install
pnpm exec playwright install
cp .env.example .env
pnpm test
```

No Windows PowerShell, use `Copy-Item .env.example .env` no lugar de `cp`.

```bash
pnpm test:front       # somente frontend
pnpm test:api         # somente API, sem abrir navegador
pnpm test:integration # integração API + UI
pnpm test:smoke       # feedback rápido
pnpm test:regression  # suíte ampliada
pnpm test:ui          # interface interativa
pnpm report           # relatório HTML
pnpm check            # todas as verificações
```

## Arquitetura

```text
features/       # business scenarios written in English with Gherkin
steps/          # implementation of Given, When and Then steps
src/
├── locators/   # somente mapeamento dos elementos da interface
├── functions/  # ações de negócio e clientes HTTP reutilizáveis
├── fixtures/   # injeção tipada e estado isolado de cada cenário
└── types/      # contratos TypeScript da API
```

Essa separação deixa os testes legíveis e reduz manutenção: a regra de negócio fica em
`features`; a automação das frases fica em `steps`; uma mudança de seletor fica em `locators`;
e uma mudança de fluxo fica em `functions`. A pasta `.features-gen` é gerada automaticamente
antes dos testes e não é versionada.

## CI e diagnóstico de falhas

A cada push ou pull request para `main`, a CI valida tipos, lint e formatação e executa todos
os projetos. O relatório HTML fica disponível como artefato por 14 dias. Em uma repetição de
falha, o Playwright coleta trace; falhas também preservam screenshot e vídeo.

## Decisões importantes

- A suíte usa `data-test` e asserções web-first, sem sleeps fixos.
- Testes de API são executados uma vez no projeto `api`, sem custo de browsers duplicados.
- O cenário integrado usa um produto retornado dinamicamente pela API, evitando ID fixo.
- URLs podem ser sobrescritas no `.env` para apontar a outro ambiente.
- A estratégia orientada a risco está em [`docs/TEST-STRATEGY.md`](docs/TEST-STRATEGY.md).

---

Feito para demonstrar raciocínio de Quality Engineering, manutenibilidade e confiança no
pipeline — não apenas quantidade de casos automatizados.
