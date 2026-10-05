/**
 * ====================================================================
 * WEB AUDIO API SPORTS CAR SYNTHESIZER
 * ====================================================================
 * High-performance synthesized sports car audio engine:
 * 1. Throttle Rev Blip (Synthesized engine revs with redline harmonics)
 * 2. Turbo Blow-Off Valve (Iconic "pshh-tsu-tsu" flutter)
 * 3. Sequential Gear Shift Click (Sharp mechanical paddle shift)
 * 4. Nitro Boost Burner (High-speed turbine flame launch)
 * 5. V8 Ambient Idle Rumble (Deep throbbing 48Hz exhaust drone)
 * 6. Pit Stop Victory Fanfare (Triumphant chord)
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isEnabled = false;
    this.isAmbientPlaying = false;
    this.ambientOscillators = [];
    this.ambientGain = null;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound(forceState = null) {
    this.init();
    if (forceState !== null) {
      this.isEnabled = forceState;
    } else {
      this.isEnabled = !this.isEnabled;
    }

    if (this.isEnabled) {
      this.playSuccess();
      this.startAmbient();
    } else {
      this.stopAmbient();
    }

    return this.isEnabled;
  }

  // 1. Gear Shift Paddle Click for UI Hovers
  playHover() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  // 2. Sequential Mechanical Shift on Clicks
  playClick() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const noiseGain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.07);

      noiseGain.gain.setValueAtTime(0.15, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  // 3. Iconic Turbo Blow-Off Valve Flutter ("Pshhh-tsu-tsu") on Mode Switches
  playTurboBlowoff() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      
      // White noise burst
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3800, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 0.35);
      filter.Q.setValueAtTime(3.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 0.36);
    } catch (e) {}
  }

  // 4. Nitro Boost Throttle Launch & Rev on Canvas Pulse
  playNitroBoost() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // Engine rev frequency sweep
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const distortion = this.ctx.createWaveShaper ? this.ctx.createWaveShaper() : null;
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.25);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.55);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(55, now);
      osc2.frequency.exponentialRampToValueAtTime(260, now + 0.25);
      osc2.frequency.exponentialRampToValueAtTime(120, now + 0.55);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.22);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.62);
      osc2.stop(now + 0.62);

      // Trigger turbo blowoff at end of rev
      setTimeout(() => {
        this.playTurboBlowoff();
      }, 300);
    } catch (e) {}
  }

  // Alias for backward compatibility
  playModeSwitch() {
    this.playTurboBlowoff();
  }

  // 5. Terminal Keystroke ECU Click
  playKeystroke() {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freqs = [1900, 2200, 2500, 2800];
      const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];

      osc.type = 'square';
      osc.frequency.setValueAtTime(randomFreq, now);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch (e) {}
  }

  // 6. Pit Stop Victory Fanfare for Success
  playSuccess() {
    if (!this.ctx) return;
    try {
      const notes = [440.0, 554.37, 659.25, 880.0]; // A4, C#5, E5, A5 Major Racing Chord
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.06, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.5);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.55);
      });
    } catch (e) {}
  }

  // 7. Low V8 Supercar Engine Idle Drone
  startAmbient() {
    if (!this.isEnabled || !this.ctx || this.isAmbientPlaying) return;
    try {
      this.isAmbientPlaying = true;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.035, this.ctx.currentTime + 1.5);
      this.ambientGain.connect(this.masterGain);

      // Low 48Hz V8 idle fundamental + harmonics
      const fundamental = 48;
      const frequencies = [fundamental, fundamental * 1.5, fundamental * 2.0];

      this.ambientOscillators = frequencies.map((freq, i) => {
        const osc = this.ctx.createOscillator();
        const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

        osc.type = i === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        if (panner) {
          panner.pan.setValueAtTime((i - 1) * 0.4, this.ctx.currentTime);
          osc.connect(panner);
          panner.connect(this.ambientGain);
        } else {
          osc.connect(this.ambientGain);
        }

        osc.start();
        return osc;
      });
    } catch (e) {}
  }

  stopAmbient() {
    if (!this.isAmbientPlaying || !this.ambientGain || !this.ctx) return;
    try {
      this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        this.ambientOscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch (e) {}
        });
        this.ambientOscillators = [];
        this.isAmbientPlaying = false;
      }, 800);
    } catch (e) {
      this.isAmbientPlaying = false;
    }
  }
}

// Global sound manager instance
window.soundEngine = new SoundEngine();
