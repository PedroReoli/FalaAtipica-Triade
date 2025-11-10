# 🚀 Guia de Deploy - FalaAtípica

## Deploy via FTP

### Passo a Passo

1. **Gerar Build de Produção**
   ```bash
   cd site
   npm run build
   ```

2. **Verificar a Pasta `out/`**
   Após o build, verifique se a pasta `out/` foi criada com todos os arquivos:
   - `out/_next/` - Arquivos JavaScript e CSS (IMPORTANTE!)
   - `out/index.html` - Página inicial
   - `out/[pasta]/index.html` - Outras páginas
   - `out/images/` - Imagens
   - Todos os outros arquivos estáticos

3. **Upload via FTP**
   - Conecte-se ao seu servidor FTP
   - Navegue até `public_html/`
   - **IMPORTANTE**: Envie TODA a pasta `out/` para `public_html/`
   - Isso inclui a pasta `_next/` (com underscore) que contém os arquivos JavaScript

4. **Estrutura Final no Servidor**
   ```
   public_html/
   ├── _next/              ← PASTA CRÍTICA! Não esqueça!
   │   ├── static/
   │   │   ├── chunks/     ← Arquivos JavaScript aqui
   │   │   └── css/        ← Arquivos CSS aqui
   │   └── ...
   ├── index.html
   ├── 404.html
   ├── aplicacoes/
   ├── sobre/
   ├── usabilidade/
   ├── images/
   └── ...
   ```

### ⚠️ Problemas Comuns

#### Erro 404 nos arquivos JavaScript
**Causa**: A pasta `_next/` não foi enviada ou está em local errado.

**Solução**:
1. Verifique se a pasta `out/_next/` existe localmente
2. Envie TODA a pasta `_next/` para `public_html/_next/`
3. Certifique-se de que os arquivos estão em `public_html/_next/static/chunks/`

#### Arquivos não carregam
**Causa**: Permissões incorretas ou caminhos errados.

**Solução**:
1. Verifique as permissões dos arquivos (644 para arquivos, 755 para pastas)
2. Certifique-se de que a estrutura de pastas está correta
3. Limpe o cache do navegador (Ctrl+F5)

### ✅ Checklist de Deploy

- [ ] Build executado com sucesso (`npm run build`)
- [ ] Pasta `out/` criada e completa
- [ ] Pasta `out/_next/` existe e tem conteúdo
- [ ] Todos os arquivos da pasta `out/` foram enviados via FTP
- [ ] Estrutura de pastas no servidor está correta
- [ ] Permissões dos arquivos estão corretas
- [ ] Site testado após deploy

### 📝 Comandos Úteis

```bash
# Build de produção
npm run build

# Verificar tamanho da pasta out
# Windows
dir out /s

# Linux/Mac
du -sh out
```

### 🔍 Verificação Pós-Deploy

1. Acesse o site: `https://falaatipica.com.br`
2. Abra o Console do navegador (F12)
3. Verifique se há erros 404
4. Teste todas as páginas principais
5. Verifique se as imagens carregam corretamente

