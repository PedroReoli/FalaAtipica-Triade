'use client'

import { useEffect, useRef } from 'react'
// @ts-ignore
import * as THREE from 'three'
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function Model3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

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

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current = renderer
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
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
    let animationId: number
    function animate() {
      animationId = requestAnimationFrame(animate)
      
      if (model) {
        model.rotation.y += 0.005
      }
      
      renderer.render(scene, camera)
    }
    animate()

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      
      if (rendererRef.current && containerRef.current) {
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
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
