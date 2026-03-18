// PROFESSIONAL NEW YEAR 2026 - MIGRATED EDITION

(function () {
    try {
        // --- COUNTDOWN LOGIC (PRESERVED) ---
        const TARGET_YEAR = 2026;
        const TARGET_DATE = new Date(TARGET_YEAR, 0, 1, 0, 0, 0).getTime();

        const dEl = document.getElementById('d');
        const hEl = document.getElementById('h');
        const mEl = document.getElementById('m');
        const sEl = document.getElementById('s');
        const countdownWrapper = document.getElementById('countdown-wrapper');
        const finalMessage = document.getElementById('final-message');
        const body = document.body;

        // Hide tree on celebration
        const treeContainer = document.querySelector('.tree-container');

        let isPulsing = false;
        let isCelebration = false;

        function updateTimer() {
            const now = new Date().getTime();
            const distance = TARGET_DATE - now;

            if (distance < 0) {
                if (!isCelebration) startCelebration();
                if (dEl) dEl.innerText = "00";
                if (hEl) hEl.innerText = "00";
                if (mEl) mEl.innerText = "00";
                if (sEl) sEl.innerText = "00";
                return;
            }

            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            if (dEl) dEl.innerText = d < 10 ? '0' + d : d;
            if (hEl) hEl.innerText = h < 10 ? '0' + h : h;
            if (mEl) mEl.innerText = m < 10 ? '0' + m : m;
            if (sEl) sEl.innerText = s < 10 ? '0' + s : s;

            if (sEl) {
                sEl.classList.remove('tick-anim');
                void sEl.offsetWidth;
                sEl.classList.add('tick-anim');
            }

            if (distance <= 600000 && !isPulsing) {
                isPulsing = true;
                if (body) body.classList.add('pulsing-mode');
            }

            requestAnimationFrame(updateTimer);
        }
        updateTimer();

        function startCelebration() {
            isCelebration = true;
            if (body) body.classList.remove('pulsing-mode');

            if (countdownWrapper) {
                countdownWrapper.style.opacity = '0';
                countdownWrapper.style.transform = 'scale(0.9) translateY(-20px)';
                setTimeout(() => {
                    countdownWrapper.style.display = 'none';
                    if (finalMessage) finalMessage.classList.remove('hidden');
                    if (treeContainer) treeContainer.style.opacity = '0'; // Hide tree
                    initFireworks();
                }, 1000);
            }
        }


        // --- GSAP SVG TREE LOGIC (FROM MERRY CHRISTMAS FOLDER) ---
        // Ensuring GSAP is loaded
        if (typeof gsap !== 'undefined' && typeof MorphSVGPlugin !== 'undefined') {

            MorphSVGPlugin.convertToPath("polygon");
            var xmlns = "http://www.w3.org/2000/svg",
                xlinkns = "http://www.w3.org/1999/xlink",
                select = function (s) {
                    return document.querySelector(s);
                },
                selectAll = function (s) {
                    return document.querySelectorAll(s);
                },
                pContainer = select(".pContainer"),
                mainSVG = select(".mainSVG"),
                star = select("#star"),
                sparkle = select(".sparkle"),
                tree = select("#tree"),
                showParticle = true,
                particleColorArray = [
                    "#E8F6F8",
                    "#ACE8F8",
                    "#F6FBFE",
                    "#A2CBDC",
                    "#B74551",
                    "#5DBA72",
                    "#910B28",
                    "#910B28",
                    "#446D39"
                ],
                particleTypeArray = ["#star", "#circ", "#cross", "#heart"],
                particlePool = [],
                particleCount = 0,
                numParticles = 201;

            gsap.set("svg", {
                visibility: "visible"
            });

            gsap.set(sparkle, {
                transformOrigin: "50% 50%",
                y: -100
            });

            let getSVGPoints = (path) => {
                let arr = [];
                var rawPath = MotionPathPlugin.getRawPath(path)[0];
                rawPath.forEach((el, value) => {
                    let obj = {};
                    obj.x = rawPath[value * 2];
                    obj.y = rawPath[value * 2 + 1];
                    if (value % 2) {
                        arr.push(obj);
                    }
                });

                return arr;
            };
            let treePath = getSVGPoints(".treePath");

            var treeBottomPath = getSVGPoints(".treeBottomPath");

            var mainTl = gsap.timeline({ delay: 0, repeat: 0 }),
                starTl;

            function flicker(p) {
                gsap.killTweensOf(p, { opacity: true });
                gsap.fromTo(
                    p,
                    {
                        opacity: 1
                    },
                    {
                        duration: 0.07,
                        opacity: Math.random(),
                        repeat: -1
                    }
                );
            }

            function createParticles() {
                var i = numParticles,
                    p,
                    particleTl,
                    step = numParticles / treePath.length,
                    pos;
                while (--i > -1) {
                    p = select(particleTypeArray[i % particleTypeArray.length]).cloneNode(true);
                    mainSVG.appendChild(p);
                    p.setAttribute("fill", particleColorArray[i % particleColorArray.length]);
                    p.setAttribute("class", "particle");
                    particlePool.push(p);
                    gsap.set(p, {
                        x: -100,
                        y: -100,
                        transformOrigin: "50% 50%"
                    });
                }
            }

            var getScale = gsap.utils.random(0.5, 3, 0.001, true);

            function playParticle(p) {
                if (!showParticle) {
                    return;
                }
                var p = particlePool[particleCount];
                gsap.set(p, {
                    x: gsap.getProperty(".pContainer", "x"),
                    y: gsap.getProperty(".pContainer", "y"),
                    scale: getScale()
                });
                var tl = gsap.timeline();
                tl.to(p, {
                    duration: gsap.utils.random(0.61, 6),
                    physics2D: {
                        velocity: gsap.utils.random(-23, 23),
                        angle: gsap.utils.random(-180, 180),
                        gravity: gsap.utils.random(-6, 50)
                    },
                    scale: 0,
                    rotation: gsap.utils.random(-123, 360),
                    ease: "power1",
                    onStart: flicker,
                    onStartParams: [p],
                    onRepeat: (p) => {
                        gsap.set(p, {
                            scale: getScale()
                        });
                    },
                    onRepeatParams: [p]
                });
                particleCount++;
                particleCount = particleCount >= numParticles ? 0 : particleCount;
            }

            function drawStar() {
                starTl = gsap.timeline({ onUpdate: playParticle });
                starTl
                    .to(".pContainer, .sparkle", {
                        duration: 6,
                        motionPath: {
                            path: ".treePath",
                            autoRotate: false
                        },
                        ease: "linear"
                    })
                    .to(".pContainer, .sparkle", {
                        duration: 1,
                        onStart: function () {
                            showParticle = false;
                        },
                        x: treeBottomPath[0].x,
                        y: treeBottomPath[0].y
                    })
                    .to(
                        ".pContainer, .sparkle",
                        {
                            duration: 2,
                            onStart: function () {
                                showParticle = true;
                            },
                            motionPath: {
                                path: ".treeBottomPath",
                                autoRotate: false
                            },
                            ease: "linear"
                        },
                        "-=0"
                    )
                    .from(
                        ".treeBottomMask",
                        {
                            duration: 2,
                            drawSVG: "0% 0%",
                            stroke: "#FFF",
                            ease: "linear"
                        },
                        "-=2"
                    );
            }

            createParticles();
            drawStar();

            mainTl
                .from([".treePathMask", ".treePotMask"], {
                    duration: 6,
                    drawSVG: "0% 0%",
                    stroke: "#FFF",
                    stagger: {
                        each: 6
                    },
                    duration: gsap.utils.wrap([6, 1, 2]),
                    ease: "linear"
                })
                .from(
                    ".treeStar",
                    {
                        duration: 3,
                        scaleY: 0,
                        scaleX: 0.15,
                        transformOrigin: "50% 50%",
                        ease: "elastic(1,0.5)"
                    },
                    "-=4"
                )

                .to(
                    ".sparkle",
                    {
                        duration: 3,
                        opacity: 0,
                        ease:
                            "rough({strength: 2, points: 100, template: linear, taper: both, randomize: true, clamp: false})"
                    },
                    "-=0"
                )
                .to(
                    ".treeStarOutline",
                    {
                        duration: 1,
                        opacity: 1,
                        ease:
                            "rough({strength: 2, points: 16, template: linear, taper: none, randomize: true, clamp: false})"
                    },
                    "+=1"
                );

            mainTl.add(starTl, 0);
            gsap.globalTimeline.timeScale(1.5);

        } else {
            console.warn("GSAP Plugins not loaded. The tree will not animate.");
        }


        // --- CELEBRATION FIREWORKS (PRESERVED) ---
        const fwCanvas = document.getElementById('fireworks-canvas');
        const fwCtx = fwCanvas ? fwCanvas.getContext('2d') : null;
        let width = window.innerWidth;
        let height = window.innerHeight;

        if (fwCanvas) {
            fwCanvas.width = width;
            fwCanvas.height = height;
        }

        window.addEventListener('resize', () => {
            width = window.innerWidth;
            height = window.innerHeight;
            if (fwCanvas) { fwCanvas.width = width; fwCanvas.height = height; }
        });

        const fwList = [];
        const fpList = [];

        function initFireworks() { loopFireworks(); }

        function loopFireworks() {
            if (!fwCtx) return;
            requestAnimationFrame(loopFireworks);

            fwCtx.globalCompositeOperation = 'destination-out';
            fwCtx.fillStyle = 'rgba(0,0,0,0.2)';
            fwCtx.fillRect(0, 0, width, height);
            fwCtx.globalCompositeOperation = 'lighter';

            if (Math.random() < 0.05) {
                fwList.push({
                    x: Math.random() * width, y: height,
                    vx: Math.random() * 4 - 2, vy: -(Math.random() * 5 + 10),
                    hue: Math.random() * 360
                });
            }

            for (let i = fwList.length - 1; i >= 0; i--) {
                let f = fwList[i];
                f.x += f.vx;
                f.y += f.vy;
                f.vy += 0.1;
                fwCtx.fillStyle = `hsl(${f.hue}, 100%, 50%)`;
                fwCtx.beginPath();
                fwCtx.arc(f.x, f.y, 3, 0, Math.PI * 2);
                fwCtx.fill();

                if (f.vy >= 0 || Math.random() < 0.01) {
                    for (let j = 0; j < 50; j++) {
                        let angle = Math.random() * Math.PI * 2;
                        let s = Math.random() * 5;
                        fpList.push({
                            x: f.x, y: f.y,
                            vx: Math.cos(angle) * s, vy: Math.sin(angle) * s,
                            hue: f.hue,
                            alpha: 1, decay: Math.random() * 0.02 + 0.01
                        });
                    }
                    fwList.splice(i, 1);
                }
            }

            for (let i = fpList.length - 1; i >= 0; i--) {
                let p = fpList[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05;
                p.alpha -= p.decay;
                fwCtx.globalAlpha = p.alpha;
                fwCtx.fillStyle = `hsl(${p.hue}, 100%, 60%)`;
                fwCtx.beginPath();
                fwCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                fwCtx.fill();
                fwCtx.globalAlpha = 1;

                if (p.alpha <= 0) fpList.splice(i, 1);
            }
        }

    } catch (e) {
        console.error("Script Error:", e);
    }
})();
