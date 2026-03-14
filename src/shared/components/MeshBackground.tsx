export const MeshBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#1f232e]">
      {/* Imita la luz de estudio de la imagen Neo-Tactile (una sola luz cyan/azul esférica principal) */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full mix-blend-screen opacity-40 blur-[100px] animate-slow-pulse pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, rgba(37,99,235,0.1) 40%, rgba(31,35,46,0) 70%)',
        }}
      />
      
      {/* Luz tenue suplementaria abajo a la derecha para dar volumen al fondo oscuro */}
      <div 
        className="absolute bottom-[-10%] right-[-5%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full mix-blend-screen opacity-20 blur-[80px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(31,35,46,0) 70%)',
        }}
      />
      
      {/* Sutil noise overlay para darle textura premium y realista */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
