import React from 'react'

/**
 * Componente para adicionar favicons e meta tags específicas
 * Garante compatibilidade com todos os navegadores
 */
export const FaviconHead: React.FC = () => {
  return (
    <>
      {/* Favicons básicos */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      
      {/* Apple Touch Icon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Meta tags para tema */}
      <meta name="theme-color" content="#1e88e5" />
      <meta name="msapplication-TileColor" content="#054776" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Meta tags para PWA */}
      <meta name="application-name" content="FalaAtípica" />
      <meta name="apple-mobile-web-app-title" content="FalaAtípica" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Meta tags para dispositivos móveis */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="format-detection" content="telephone=no" />
    </>
  )
}
