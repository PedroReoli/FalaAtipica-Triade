/**
 * Serviço de Cache para Uploads
 * 
 * Armazena arquivos em memória até o serviço fechar.
 * Útil para manter uploads durante a sessão do usuário.
 */

interface CachedFile {
  id: string;
  file: File;
  patientId: string;
  type: 'report' | 'document';
  uploadedAt: string;
  url?: string; // URL temporária para visualização
}

class UploadCacheService {
  private cache: Map<string, CachedFile> = new Map();
  private urlCache: Map<string, string> = new Map();

  /**
   * Adiciona um arquivo ao cache
   */
  addFile(patientId: string, file: File, type: 'report' | 'document'): CachedFile {
    const id = `${type}_${patientId}_${Date.now()}_${file.name}`;
    
    // Criar URL temporária para visualização
    const url = URL.createObjectURL(file);
    
    const cachedFile: CachedFile = {
      id,
      file,
      patientId,
      type,
      uploadedAt: new Date().toISOString(),
      url
    };

    this.cache.set(id, cachedFile);
    this.urlCache.set(id, url);

    console.log(`✅ [UPLOAD CACHE] Arquivo adicionado: ${file.name} (${id})`);
    console.log(`📊 [UPLOAD CACHE] Total de arquivos no cache: ${this.cache.size}`);

    return cachedFile;
  }

  /**
   * Remove um arquivo do cache
   */
  removeFile(id: string): boolean {
    const cachedFile = this.cache.get(id);
    
    if (cachedFile && cachedFile.url) {
      // Revogar URL temporária para liberar memória
      URL.revokeObjectURL(cachedFile.url);
      this.urlCache.delete(id);
    }

    const deleted = this.cache.delete(id);
    
    if (deleted) {
      console.log(`🗑️ [UPLOAD CACHE] Arquivo removido: ${id}`);
      console.log(`📊 [UPLOAD CACHE] Total de arquivos no cache: ${this.cache.size}`);
    }

    return deleted;
  }

  /**
   * Busca arquivo por ID
   */
  getFile(id: string): CachedFile | undefined {
    return this.cache.get(id);
  }

  /**
   * Busca todos os arquivos de um paciente
   */
  getFilesByPatient(patientId: string, type?: 'report' | 'document'): CachedFile[] {
    const files: CachedFile[] = [];

    this.cache.forEach((cachedFile) => {
      if (cachedFile.patientId === patientId) {
        if (!type || cachedFile.type === type) {
          files.push(cachedFile);
        }
      }
    });

    // Ordenar por data de upload (mais recente primeiro)
    return files.sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  }

  /**
   * Busca todos os relatórios de um paciente
   */
  getReportsByPatient(patientId: string): CachedFile[] {
    return this.getFilesByPatient(patientId, 'report');
  }

  /**
   * Busca todos os documentos de um paciente
   */
  getDocumentsByPatient(patientId: string): CachedFile[] {
    return this.getFilesByPatient(patientId, 'document');
  }

  /**
   * Limpa todo o cache
   */
  clearCache(): void {
    // Revogar todas as URLs temporárias
    this.urlCache.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    this.cache.clear();
    this.urlCache.clear();

    console.log(`🧹 [UPLOAD CACHE] Cache limpo`);
  }

  /**
   * Retorna estatísticas do cache
   */
  getCacheStats(): {
    totalFiles: number;
    totalSize: number;
    filesByType: { reports: number; documents: number };
  } {
    let totalSize = 0;
    let reports = 0;
    let documents = 0;

    this.cache.forEach((cachedFile) => {
      totalSize += cachedFile.file.size;
      if (cachedFile.type === 'report') {
        reports++;
      } else {
        documents++;
      }
    });

    return {
      totalFiles: this.cache.size,
      totalSize,
      filesByType: { reports, documents }
    };
  }

  /**
   * Simula persistência para a API
   * (Aqui você pode implementar o envio real para o backend)
   */
  async persistFile(id: string): Promise<boolean> {
    const cachedFile = this.cache.get(id);
    
    if (!cachedFile) {
      console.error(`❌ [UPLOAD CACHE] Arquivo não encontrado: ${id}`);
      return false;
    }

    // TODO: Implementar envio para API real
    console.log(`💾 [UPLOAD CACHE] Persistindo arquivo: ${cachedFile.file.name}`);
    
    // Simulação de sucesso
    return true;
  }
}

// Exportar instância singleton
export const uploadCacheService = new UploadCacheService();

// Limpar cache quando a página for fechada
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    uploadCacheService.clearCache();
  });
}

