<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

declare global {
  interface Window {
    anime: any;
  }
}

const elementsToReveal = ref<HTMLElement[]>([]);
const isScrolled = ref(false);

const setupHeroAnimations = () => {
  window.anime({
    targets: '.hero-line1',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 300,
    complete: function() {
      window.anime({
        targets: '.hero-alpha',
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .8)',
        complete: function() {
          window.anime({
            targets: '.roblox-logo',
            opacity: [0, 1],
            scale: [0.2, 1],
            rotate: [120, -40],
            translateX: [-10, 0],
            translateY: [10, 0],
            duration: 800,
            easing: 'easeOutElastic(1, .5)',
          });
          setTimeout(() => {
            window.anime({
              targets: '.hero-line2',
              opacity: [0, 1], 
              translateX: [10, 0],
              duration: 400,
              easing: 'easeOutQuad',
            });
          }, 300);
        }
      });
      
      window.anime({
        targets: '.hero-description',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        easing: 'easeOutQuad',
        delay: 1200
      });
      
      setTimeout(() => {
        window.anime({
          targets: '.hero-alpha',
          textShadow: [
            '0 0 5px rgba(16, 185, 129, 0.2)',
            '0 0 20px rgba(16, 185, 129, 0.6)',
            '0 0 5px rgba(16, 185, 129, 0.2)'
          ],
          loop: true,
          duration: 3000,
          easing: 'easeInOutSine',
          direction: 'alternate'
        });
      }, 1500);
    }
  });
};

const setupTextLetterAnimation = () => {
  const textElements = document.querySelectorAll('.letter-animate');
  textElements.forEach(el => {
    const text = el.textContent || '';
    const lettersHTML = text.split('').map(letter => {
      if(letter === ' ') {
        return '<span class="letter">&nbsp;</span>';
      }
      return `<span class="letter">${letter}</span>`;
    }).join('');
    el.innerHTML = lettersHTML;
  });

  window.anime.timeline()
    .add({
      targets: '.letter-animate .letter',
      opacity: [0, 1],
      translateY: [20, 0],
      translateZ: 0,
      duration: 800,
      delay: (_el: any, i: number) => 100 + 25 * i,
      easing: 'easeOutExpo'
    });
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;

  elementsToReveal.value.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    if (rect.top <= windowHeight * 0.8) {
      el.classList.add('revealed');
    }
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
  
  elementsToReveal.value = Array.from(document.querySelectorAll('.reveal'));
  handleScroll();
  
  setupHeroAnimations();
  setupTextLetterAnimation();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="min-h-screen bg-alpha-dark-900 text-white">
    <main>
      <section id="hero" class="relative overflow-hidden pt-20 pb-20 md:pt-0 md:pb-0 px-6 min-h-screen flex items-center dotted-pattern">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-20 -right-16 w-72 h-72 bg-alpha-green-600/5 rounded-full blur-xl floating-slow"></div>
          <div class="absolute bottom-20 -left-16 w-64 h-64 bg-alpha-green-600/5 rounded-full blur-xl floating" style="animation-delay: -2s;"></div>
          <div class="absolute top-1/3 left-1/4 w-6 h-6 border border-alpha-green-500/30 rounded-full floating"></div>
          <div class="absolute top-2/3 right-1/3 w-8 h-8 border border-alpha-green-500/20 rounded-full floating-fast"></div>
          <div class="absolute bottom-1/4 left-1/2 w-10 h-10 border border-alpha-green-500/20 rounded-full floating-slow"></div>
          <div class="absolute top-1/2 right-1/4 w-24 h-24 border border-alpha-green-500/10 rounded-full floating" style="animation-delay: -1s;"></div>
        </div>
        
        <div class="container mx-auto relative z-10 min-h-[80vh] flex items-center justify-center">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-5xl md:text-6xl font-bold mb-6">
              <div class="hero-line1 opacity-0 mb-4">
                <span class="letter-animate block">로블록스를 만들고 싶은 모든 순간,</span>
              </div>
              <div class="flex items-center justify-center mt-4 relative">
                <span class="text-gradient hero-alpha opacity-0 mr-1">Alpha</span>
                <img src="./assets/roblox.png" alt="Roblox" class="roblox-logo absolute opacity-0 w-12 h-12" />
                <span class="hero-line2 opacity-0">에서 시작하세요.</span>
              </div>
            </h1>
            <p class="text-xl text-gray-300 mb-8 hero-description opacity-0">
              Alpha는 개발부터 팀 구성, 아이템 판매까지<br />
              당신의 가능성을 현실로 만듭니다.
            </p>
          </div>
        </div>
      </section>

      <section id="services" class="relative py-28 overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div class="absolute -top-40 -right-40 w-80 h-80 bg-alpha-green-500/5 rounded-full blur-3xl"></div>
          <div class="absolute top-1/3 -left-20 w-60 h-60 bg-alpha-green-500/5 rounded-full blur-3xl"></div>
          <div class="absolute top-3/4 right-1/4 w-40 h-40 bg-alpha-green-500/5 rounded-full blur-3xl"></div>
          <div class="absolute inset-0 bg-[radial-gradient(#10b98133_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10">
          <div class="text-center mb-20">
            <div class="inline-flex items-center justify-center mb-3 px-3 py-1 rounded-full bg-alpha-green-500/10 border border-alpha-green-500/20">
              <span class="text-sm font-medium text-alpha-green-400">Our Services</span>
            </div>
            <h2 class="text-5xl font-bold mb-6">Alpha의 <span class="text-gradient relative inline-block">
              서비스
              <svg class="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3C50 0.5 150 0.5 200 3" stroke="url(#paint1_linear)" stroke-width="5" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="paint1_linear" x1="0" y1="3" x2="200" y2="3" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#10B981" stop-opacity="0"/>
                    <stop offset="0.5" stop-color="#10B981"/>
                    <stop offset="1" stop-color="#10B981" stop-opacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </span></h2>
            <p class="text-gray-400 max-w-2xl mx-auto text-lg">
              Alpha의 다양한 서비스를 통해 로블록스 게임 개발의 새로운 가능성을 경험하세요.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div class="group relative h-full">
              <div class="absolute inset-0 bg-gradient-to-br from-alpha-dark-800 to-alpha-dark-950 rounded-2xl overflow-hidden">
                <div class="absolute inset-0 backdrop-blur-sm bg-alpha-dark-900/30"></div>
                <div class="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
                <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <div class="absolute inset-0 bg-gradient-to-br from-alpha-green-500/10 to-transparent rounded-2xl transform rotate-12 scale-150"></div>
                </div>
              </div>
              
              <div class="relative rounded-2xl p-8 h-full flex flex-col">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-alpha-green-500/20 to-alpha-green-500/5 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-alpha-green-500/10 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-alpha-green-400 group-hover:text-alpha-green-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                
                <div class="mb-6">
                  <h3 class="text-2xl font-bold mb-1 text-white group-hover:text-alpha-green-400 transition-colors">전문 강의</h3>
                </div>
                
                <p class="text-gray-400 leading-relaxed">
                  배우는 걸 넘어, 만들 수 있게. <br>
                  Alpha와 함께하는 로블록스 실무 마스터 클래스.
                </p>
              </div>
            </div>
            
            <div class="group relative h-full">
              <div class="absolute inset-0 bg-gradient-to-br from-alpha-dark-800 to-alpha-dark-950 rounded-2xl overflow-hidden">
                <div class="absolute inset-0 backdrop-blur-sm bg-alpha-dark-900/30"></div>
                <div class="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
                <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <div class="absolute inset-0 bg-gradient-to-br from-alpha-green-500/10 to-transparent rounded-2xl transform rotate-12 scale-150"></div>
                </div>
              </div>
              
              <div class="relative rounded-2xl p-8 h-full flex flex-col">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-alpha-green-500/20 to-alpha-green-500/5 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-alpha-green-500/10 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-alpha-green-400 group-hover:text-alpha-green-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                
                <div class="mb-6">
                  <h3 class="text-2xl font-bold mb-1 text-white group-hover:text-alpha-green-400 transition-colors">개발자 모집</h3>
                </div>
                
                <p class="text-gray-400 leading-relaxed">
                  최고의 로블록스 개발자를 만나보세요. <br>
                  프로젝트에 딱 맞는 인재를 찾아드립니다.
                </p>
              </div>
            </div>
            
            <div class="group relative h-full">
              <div class="absolute inset-0 bg-gradient-to-br from-alpha-dark-800 to-alpha-dark-950 rounded-2xl overflow-hidden">
                <div class="absolute inset-0 backdrop-blur-sm bg-alpha-dark-900/30"></div>
                <div class="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
                <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <div class="absolute inset-0 bg-gradient-to-br from-alpha-green-500/10 to-transparent rounded-2xl transform rotate-12 scale-150"></div>
                </div>
              </div>
              
              <div class="relative rounded-2xl p-8 h-full flex flex-col">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-alpha-green-500/20 to-alpha-green-500/5 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-alpha-green-500/10 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-alpha-green-400 group-hover:text-alpha-green-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                
                <div class="mb-6">
                  <h3 class="text-2xl font-bold mb-1 text-white group-hover:text-alpha-green-400 transition-colors">팀 모집</h3>
                </div>
                
                <p class="text-gray-400 leading-relaxed">
                  함께 게임을 만들 팀원을 찾고 계신가요? <br>
                  뜻이 맞는 팀원들과 함께 꿈을 현실로 만들어보세요.
                </p>
              </div>
            </div>
            
            <div class="group relative h-full">
              <div class="absolute inset-0 bg-gradient-to-br from-alpha-dark-800 to-alpha-dark-950 rounded-2xl overflow-hidden">
                <div class="absolute inset-0 backdrop-blur-sm bg-alpha-dark-900/30"></div>
                <div class="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
                <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <div class="absolute inset-0 bg-gradient-to-br from-alpha-green-500/10 to-transparent rounded-2xl transform rotate-12 scale-150"></div>
                </div>
              </div>
              
              <div class="relative rounded-2xl p-8 h-full flex flex-col">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-alpha-green-500/20 to-alpha-green-500/5 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-alpha-green-500/10 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-alpha-green-400 group-hover:text-alpha-green-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                
                <div class="mb-6">
                  <h3 class="text-2xl font-bold mb-1 text-white group-hover:text-alpha-green-400 transition-colors">상품 판매</h3>
                </div>
                
                <p class="text-gray-400 leading-relaxed">
                  로블록스 게임에 필요한 다양한 아이템과 에셋을 <br>
                  손쉽게 구매하고 판매할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
          <div class="text-center mt-20">
          </div>
        </div>
      </section>

      <footer class="bg-alpha-dark-950 py-12 px-6 border-t border-gray-800/30">
        <div class="container mx-auto">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="mb-8 md:mb-0">
              <div class="flex items-center mb-3 justify-center md:justify-start">
                <img src="/logo.svg" alt="Alpha Logo" class="h-8 w-8 mr-2 pulse-glow" />
                <span class="text-2xl font-bold text-alpha-green-500">Alpha</span>
              </div>
              <p class="text-gray-400 mt-2 text-center md:text-left">Next is Roblox. With Alpha.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.roblox-logo {
  transform: rotate(-40deg);
  transform-origin: center;
  filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.5));
  left: 55px; 
  bottom: 6px;
  z-index: 10;
  width: 42px;
  height: 42px;
}

.hero-alpha {
  position: relative;
  display: inline-block;
}
</style>
