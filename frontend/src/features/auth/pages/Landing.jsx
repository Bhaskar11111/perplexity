import React from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import FaultyTerminal from '../components/Bits/LandingAnimation'

const Landing=(()=>
{   
    const homeWelcomeMessages = [
  <>
    What is the one thing you know is true, but you cannot{" "}
    <span className="text-violet-400/70 font-medium">actually prove</span>?
  </>,

  <>
    If your <span className="text-violet-400/70 font-medium">mind</span> had a physical{" "}
    <span className="text-violet-400/70 font-medium">shape</span>, what would it look like
    right now?
  </>,

  <>
    What <span className="text-violet-400/70 font-medium">question</span> are you most afraid
    of knowing the <span className="text-violet-400/70 font-medium">absolute answer</span> to?
  </>,

  <>
    If you could <span className="text-violet-400/70 font-medium">unlearn</span> one single
    fact, what would you choose to <span className="text-violet-400/70 font-medium">forget</span>?
  </>,

  <>
    What is a <span className="text-violet-400/70 font-medium">concept</span> or idea that
    your brain completely refuses to <span className="text-violet-400/70 font-medium">grasp</span>?
  </>,

  <>
    If you could see a <span className="text-violet-400/70 font-medium">hidden metric</span>{" "}
    floating above people's heads, what would it{" "}
    <span className="text-violet-400/70 font-medium">measure</span>?
  </>,

  <>
    What part of <span className="text-violet-400/70 font-medium">human behavior</span> makes
    the least amount of <span className="text-violet-400/70 font-medium">sense</span> to you?
  </>,

  <>
    If you had to explain the feeling of{" "}
    <span className="text-violet-400/70 font-medium">nostalgia</span> to an{" "}
    <span className="text-violet-400/70 font-medium">alien</span>, what words would you use?
  </>,

  <>
    What is something you completely took for{" "}
    <span className="text-violet-400/70 font-medium">granted</span> until it suddenly{" "}
    <span className="text-violet-400/70 font-medium">vanished</span>?
  </>,

  <>
    If your current <span className="text-violet-400/70 font-medium">mood</span> was an{" "}
    <span className="text-violet-400/70 font-medium">atmospheric sound</span>, what would it
    sound like?
  </>,
]

    const homeLogline=[
        "Thoughts, knowledge, and vision, working in perfect context.",
"Where every conversation becomes lasting intelligence.",
"The workspace where ideas find their next step.",
"Think beyond ordinary.",
"Context is your superpower.",
"Every answer begins with understanding.",
"Search, reason, revisit chats, and ask about images in one focused workspace",
"Built for minds that ask better questions.",
"One place for every thought worth continuing."
]

document.title='Etos | Home'


    const randomWelcome=homeWelcomeMessages[(Math.floor(Math.random()*homeWelcomeMessages.length))]

    const randomLogline=homeLogline[(Math.floor(Math.random()*homeLogline.length))]

    const user=useSelector((state)=>state.auth.user)

    return(
        
        <main className="home-page min-h-screen relative overflow-hidden z-99 font-thin bg-[#111] text-white">
              
  <div className='w-full h-[100vh] -z-10 absolute'>
  <FaultyTerminal
    scale={1.9}
    gridMul={[2, 1]}
    digitSize={1.2}
    timeScale={0.5}
    pause={false}
    scanlineIntensity={0.2}
    glitchAmount={1}
    flickerAmount={.1}
    noiseAmp={0.7}
    chromaticAberration={0}
    dither={0}
    curvature={0.23}
    tint="#AF72D8"
    mouseReact
    mouseStrength={0.2}
    pageLoadAnimation
    brightness={0.9}
  />

</div>
            
            <header className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
                <Link to="/get-started" className="flex items-center">
                    <span className="grid h-8 w-8 place-items-center text-3xl font-thin rotate-3">&xi;</span>
                    <span className="text-xl font-thin tracking-[0]">Etos</span>
                </Link>

                <nav className="flex items-center gap-1">
                    <Link
                        to="/login"
                        className="rounded-md px-4 py-2 text-sm font-medium text-white/56 transition hover:bg-white/[0.05] hover:text-white"
                    >
                        Login
                    </Link>
                    <Link
                        to={user ? "/dashboard" : "/register"}
                        className="rounded-md px-4 py-2 text-sm font-medium text-white/82 transition hover:bg-white/[0.05] hover:text-white"
                    >
                        {user ? "Open app" : "Create account"}
                    </Link>
                </nav>
            </header>

            <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-3xl flex-col items-center justify-center px-5 text-center">
                <div className="mb-8 flex items-center justify-center">
                    <span className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-[#18161A] text-5xl font-thin text-white/88 ">&xi;</span>
                </div>

                <h1 className="text-4xl font-thin leading-tight tracking-[0] uppercase text-white/80 sm:text-5xl md:text-6xl">
                {(randomWelcome)}
                </h1>

                <p className="mt-5 max-w-xl text-[16px] leading-7 text-white/48">
                    {(randomLogline).toUpperCase()}
                </p>

                <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row">
                    <Link
                        to={user ? "/dashboard" : "/register"}
                        className="flex h-12 flex-1 items-center justify-center rounded-md bg-[#7b5be6] py-2 px-5 text-sm font-medium text-white transition hover:bg-[#8b6cf1]"
                    >
                        {user ? "Continue" : "Create account"}
                    </Link>

                    <Link
                        to="/login"
                        className="flex h-12 flex-1 items-center justify-center rounded-md border backdrop-blur-[5px] border-white/10 px-5 py-2 text-sm font-medium text-white/68 transition hover:border-white/18 hover:bg-white/10 hover:text-white"
                    >
                        Login
                    </Link>
                </div>
            </section>

            <footer className="mx-auto flex h-16 w-full max-w-6xl items-center justify-center px-5 text-xs text-white/28 sm:px-8">
                Etos by Bhaskar
            </footer>
        </main>
    )
})

export default Landing;
