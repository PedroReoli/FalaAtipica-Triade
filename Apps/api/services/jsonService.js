// Serviço para ler e escrever arquivos JSON
const fs = require('fs').promises;
const path = require('path');

class JSONService {
  constructor() {
    this.basePath = path.join(__dirname, '../../Mockup');
  }

  // Ler arquivo JSON
  async readJSON(filePath) {
    try {
      const fullPath = path.join(this.basePath, filePath);
      const data = await fs.readFile(fullPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`❌ Erro ao ler JSON: ${filePath}`, error.message);
      throw new Error(`Não foi possível ler o arquivo: ${filePath}`);
    }
  }

  // Escrever arquivo JSON
  async writeJSON(filePath, data) {
    try {
      const fullPath = path.join(this.basePath, filePath);
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(fullPath, jsonData, 'utf8');
      console.log(`✅ JSON atualizado: ${filePath}`);
      return true;
    } catch (error) {
      console.error(`❌ Erro ao escrever JSON: ${filePath}`, error.message);
      throw new Error(`Não foi possível escrever o arquivo: ${filePath}`);
    }
  }

  // Adicionar item ao array em JSON
  async addToJSON(filePath, arrayKey, newItem) {
    try {
      const data = await this.readJSON(filePath);
      
      if (!data[arrayKey]) {
        data[arrayKey] = [];
      }
      
      data[arrayKey].push(newItem);
      await this.writeJSON(filePath, data);
      
      return newItem;
    } catch (error) {
      console.error(`❌ Erro ao adicionar ao JSON:`, error.message);
      throw error;
    }
  }

  // Atualizar item em array do JSON
  async updateInJSON(filePath, arrayKey, itemId, updates) {
    try {
      const data = await this.readJSON(filePath);
      
      if (!data[arrayKey]) {
        throw new Error(`Array ${arrayKey} não encontrado`);
      }
      
      const index = data[arrayKey].findIndex(item => item.id === itemId);
      
      if (index === -1) {
        throw new Error(`Item ${itemId} não encontrado`);
      }
      
      data[arrayKey][index] = { ...data[arrayKey][index], ...updates };
      await this.writeJSON(filePath, data);
      
      return data[arrayKey][index];
    } catch (error) {
      console.error(`❌ Erro ao atualizar JSON:`, error.message);
      throw error;
    }
  }

  // Deletar item do array em JSON
  async deleteFromJSON(filePath, arrayKey, itemId) {
    try {
      const data = await this.readJSON(filePath);
      
      if (!data[arrayKey]) {
        throw new Error(`Array ${arrayKey} não encontrado`);
      }
      
      data[arrayKey] = data[arrayKey].filter(item => item.id !== itemId);
      await this.writeJSON(filePath, data);
      
      return true;
    } catch (error) {
      console.error(`❌ Erro ao deletar do JSON:`, error.message);
      throw error;
    }
  }

  // Buscar item por ID
  async findById(filePath, arrayKey, itemId) {
    try {
      const data = await this.readJSON(filePath);
      
      if (!data[arrayKey]) {
        return null;
      }
      
      return data[arrayKey].find(item => item.id === itemId) || null;
    } catch (error) {
      console.error(`❌ Erro ao buscar item:`, error.message);
      return null;
    }
  }
}

module.exports = new JSONService();

