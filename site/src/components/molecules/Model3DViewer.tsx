'use client'

import { useEffect, useRef, useState } from 'react'
// @ts-ignore
import * as THREE from 'three'
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function Model3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!containerRef.current || isInitialized) return

    // Limpar container antes de inicializar
    if (containerRef.current.hasChildNodes()) {
      containerRef.current.innerHTML = ''
    }

    // Setup Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Setup Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 5)
    cameraRef.current = camera

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current = renderer
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0) // Fundo transparente
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(10, 10, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.4)
    pointLight.position.set(-10, -10, -5)
    scene.add(pointLight)

    // Load Model
    const loader = new GLTFLoader()
    let model: THREE.Group | null = null

    loader.load(
      '/blender/falaatipica3d.glb',
      // @ts-ignore
      (gltf: any) => {
        model = gltf.scene
        model.scale.set(3, 3, 3)
        scene.add(model)
      },
      undefined,
      // @ts-ignore
      (error: any) => {
        console.error('Erro ao carregar modelo 3D:', error)
      }
    )

    // Animation Loop
    function animate() {
      animationIdRef.current = requestAnimationFrame(animate)
      
      if (model) {
        model.rotation.y += 0.005
      }
      
      if (rendererRef.current && cameraRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }
    animate()

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    setIsInitialized(true)

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      window.removeEventListener('resize', handleResize)
      
      if (rendererRef.current && containerRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
      
      if (sceneRef.current) {
        // @ts-ignore
        sceneRef.current.traverse((object: any) => {
          // @ts-ignore
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose()
            if (Array.isArray(object.material)) {
              // @ts-ignore
              object.material.forEach((material: any) => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        })
      }
      
      // Reset refs
      sceneRef.current = null
      rendererRef.current = null
      cameraRef.current = null
      animationIdRef.current = null
      setIsInitialized(false)
    }
  }, [])

  // Reset quando o componente é desmontado e remontado
  useEffect(() => {
    return () => {
      setIsInitialized(false)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
