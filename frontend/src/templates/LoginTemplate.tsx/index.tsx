export function LoginTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <div className="lg:bg-[url('/images/image-login.jpg')] lg:bg-no-repeat lg:bg-cover lg:bg-center lg:w-[60%] lg:h-screen"></div>
      <div className="h-screen w-screen bg-[url('/images/image-login.jpg')] bg-no-repeat bg-cover bg-center lg:bg-none lg:bg-neutral-600 lg:w-[40%] lg:h-screen">
        <div className='flex flex-col justify-center items-center h-screen bg-black/50'>
          {children}
        </div>
      </div>
    </div>
  );
}
