# Funcionalidade de Reutilização de CVs - Job Tracker

## Resumo da Implementação

Esta funcionalidade permite que os usuários selecionem CVs já enviados anteriormente ao criar um novo job, similar ao LinkedIn. O usuário pode escolher entre CVs anteriores ou fazer upload de um novo arquivo.

## Backend - Alterações Implementadas

### 1. Nova Tabela de CVs
- **Arquivo**: `backend/src/data/createCVTable.js`
- **Tabela**: `cvs`
- **Campos**:
  - `id` (SERIAL PRIMARY KEY)
  - `user_id` (INTEGER, FK para users)
  - `file_url` (TEXT)
  - `original_filename` (TEXT)
  - `created_at` (TIMESTAMP)

### 2. Modelo de CVs
- **Arquivo**: `backend/src/models/cvModel.js`
- **Funções adicionadas**:
  - `saveCVToDB()` - Salva novo CV na tabela
  - `getCVsByUserId()` - Busca CVs do usuário

### 3. Controller de CVs
- **Arquivo**: `backend/src/controllers/cvController.js`
- **Endpoint**: `GET /api/cvs`
- **Funcionalidade**: Retorna todos os CVs do usuário autenticado

### 4. Rotas de CVs
- **Arquivo**: `backend/src/routes/cvRoutes.js`
- **Rota**: `GET /api/cvs` (autenticada)

### 5. Atualização do Controller de Jobs
- **Arquivo**: `backend/src/controllers/jobController.js`
- **Modificações**:
  - Salva automaticamente CVs na tabela `cvs` quando um novo arquivo é enviado
  - Funciona tanto na criação quanto na atualização de jobs

### 6. Inicialização da Tabela
- **Arquivo**: `backend/src/index.js`
- **Modificação**: Adicionada chamada para `createCVTable()` na inicialização

## Frontend - Alterações Implementadas

### 1. Componente CVSelector
- **Arquivo**: `jobtracker-frontend/components/jobs/CVSelector.tsx`
- **Funcionalidades**:
  - Dropdown para seleção de CVs anteriores
  - Exibe nome do arquivo e data de upload
  - Opção para upload de novo CV
  - Interface responsiva e acessível

### 2. Atualização do JobForm
- **Arquivo**: `jobtracker-frontend/components/jobs/JobForm.tsx`
- **Modificações**:
  - Integração com CVSelector
  - Suporte para upload de arquivos
  - Validação atualizada para CVs
  - Envio de FormData quando há arquivo
  - Envio de dados JSON quando CV anterior é selecionado

### 3. Atualização da Página Principal
- **Arquivo**: `jobtracker-frontend/app/(main)/home/page.tsx`
- **Modificações**:
  - Suporte para FormData no envio
  - Headers dinâmicos baseados no tipo de dados

## Fluxo de Funcionamento

### Cenário 1: Upload de Novo CV
1. Usuário clica em "Upload new CV"
2. Seleciona arquivo (.pdf, .doc, .docx)
3. Arquivo é enviado como FormData
4. Backend salva arquivo e registra na tabela `cvs`
5. Job é criado com referência ao arquivo

### Cenário 2: Seleção de CV Anterior
1. Usuário clica no dropdown de CVs
2. Vê lista de CVs anteriores com datas
3. Seleciona um CV da lista
4. Dados são enviados como JSON com `cv_file_url`
5. Job é criado sem upload de novo arquivo

## Benefícios da Implementação

1. **Reutilização**: Usuários não precisam re-uploadar CVs
2. **Histórico**: Mantém histórico de todos os CVs enviados
3. **Performance**: Reduz uploads desnecessários
4. **UX**: Interface intuitiva similar ao LinkedIn
5. **Flexibilidade**: Mantém opção de upload manual

## Próximos Passos Sugeridos

1. **Gerenciamento de CVs**: Interface para deletar/renomear CVs
2. **Versões**: Sistema de versionamento de CVs
3. **Templates**: Diferentes versões para diferentes tipos de vaga
4. **Analytics**: Estatísticas de uso de cada CV
5. **Compartilhamento**: Compartilhar CVs entre contas

## Testes Recomendados

1. Testar upload de novo CV
2. Testar seleção de CV anterior
3. Testar validação de formulário
4. Testar responsividade em diferentes dispositivos
5. Testar performance com muitos CVs
6. Testar diferentes tipos de arquivo

## Considerações de Segurança

1. Validação de tipos de arquivo no frontend e backend
2. Autenticação obrigatória para acesso aos CVs
3. Isolamento de CVs por usuário
4. Sanitização de nomes de arquivo
5. Limite de tamanho de arquivo 