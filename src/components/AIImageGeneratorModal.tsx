import { useState } from 'react';
import { X, Sparkles, Image as ImageIcon, Sliders, Download, Check, RefreshCw, Wand2, ArrowRight, Maximize2, ShieldCheck, Layers, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { AuraSVG } from './AuraArt';

interface AIImageGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product;
  onSelectProduct?: (product: Product) => void;
  onToastNotification?: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export type ImageSizeOption = '1K' | '2K' | '4K';
export type AspectRatioOption = '1:1' | '16:9' | '4:3' | '3:4';

interface GeneratedImageItem {
  id: string;
  url: string;
  size: ImageSizeOption;
  aspectRatio: AspectRatioOption;
  prompt: string;
  productName: string;
  timestamp: string;
}

export function AIImageGeneratorModal({
  isOpen,
  onClose,
  initialProduct,
  onSelectProduct,
  onToastNotification
}: AIImageGeneratorModalProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    initialProduct || PRODUCTS[0]
  );
  
  // Image Generation Settings
  const [imageSize, setImageSize] = useState<ImageSizeOption>('2K');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioOption>('1:1');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  
  // Loading & State
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStepText, setCurrentStepText] = useState('Initializing AI Studio...');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Generated Results
  const [generatedGallery, setGeneratedGallery] = useState<GeneratedImageItem[]>([]);
  const [activeGeneratedImg, setActiveGeneratedImg] = useState<GeneratedImageItem | null>(null);
  const [isFullscreenView, setIsFullscreenView] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Preset prompts tailored for interior styling
  const presets = [
    { label: 'Scandinavian Daylight', text: 'Set in a sunlit Scandinavian living room with whitewashed oak flooring, soft linen curtains, and organic potted greenery.' },
    { label: 'Japandi Sanctuary', text: 'Placed in a serene Japandi corner with beige micro-cement walls, warm ambient floor lamp, and subtle bamboo accents.' },
    { label: 'Modern Architectural Studio', text: 'Staged inside a sleek modern gallery space with polished concrete floors, dramatic soft spotlighting, and minimal decor.' },
    { label: 'Luxury Penthouse Dining', text: 'Positioned on a travertine marble surface in a high-floor penthouse at dusk with warm architectural accent lighting.' },
    { label: 'Cozy Reading Nook', text: 'Arranged in a warm, inviting reading corner with a plush bouclé armchair, soft wool rug, and gentle evening sunlight.' }
  ];

  const handleApplyPreset = (presetText: string) => {
    setCustomPrompt(presetText);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    setCurrentStepText('Analyzing product finish & material properties...');

    const promptText = customPrompt.trim() || `Staged in a stylish modern living room with warm natural daylight and minimalist decor.`;

    try {
      // Simulate visual progress stages
      const step1 = setTimeout(() => {
        setCurrentStepText(`Connecting to model gemini-3-pro-image-preview at ${imageSize} resolution...`);
      }, 1200);

      const step2 = setTimeout(() => {
        setCurrentStepText(`Synthesizing photorealistic textures & architectural lighting...`);
      }, 2800);

      const res = await fetch('/api/generate-product-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          imageSize,
          aspectRatio,
          productName: selectedProduct.name,
          productMaterial: selectedProduct.material,
          category: selectedProduct.category
        }),
      });

      clearTimeout(step1);
      clearTimeout(step2);

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate image. Please check API key or try again.');
      }

      const newItem: GeneratedImageItem = {
        id: Date.now().toString(),
        url: data.imageUrl,
        size: data.imageSize || imageSize,
        aspectRatio: data.aspectRatio || aspectRatio,
        prompt: promptText,
        productName: selectedProduct.name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setGeneratedGallery((prev) => [newItem, ...prev]);
      setActiveGeneratedImg(newItem);

      if (onToastNotification) {
        onToastNotification(`Generated ${newItem.size} ultra high-res image for "${selectedProduct.name}"!`, 'success');
      }
    } catch (err: any) {
      console.error('Image generation error:', err);
      setErrorMsg(err.message || 'An error occurred while generating the image.');
      if (onToastNotification) {
        onToastNotification(err.message || 'Failed to generate image.', 'error');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (img: GeneratedImageItem) => {
    const link = document.createElement('a');
    link.href = img.url;
    link.download = `AuraNest-${img.productName.replace(/\s+/g, '-')}-${img.size}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onToastNotification) {
      onToastNotification(`Downloading ${img.size} photorealistic image file...`, 'info');
    }
  };

  const handleCopyImageData = (img: GeneratedImageItem) => {
    navigator.clipboard.writeText(img.url);
    setCopiedLink(true);
    if (onToastNotification) {
      onToastNotification('Image Data URL copied to clipboard!', 'success');
    }
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-charcoal/70 backdrop-blur-md" id="ai-image-modal-backdrop">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#E8DCCB] my-auto overflow-hidden text-left font-sans flex flex-col max-h-[90vh]"
          id="ai-image-modal-card"
        >
          {/* Modal Header */}
          <div className="px-6 py-4 bg-ivory border-b border-[#E8DCCB] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-terracotta text-white flex items-center justify-center shadow-md shrink-0">
                <Wand2 size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif font-bold text-lg text-charcoal">AI Décor Staging Studio</h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 font-mono text-[11px] font-bold border border-amber-500/20">
                    <Sparkles size={11} /> gemini-3-pro-image-preview
                  </span>
                </div>
                <p className="text-xs text-charcoal/60 font-sans">
                  Generate photorealistic 1K, 2K, and 4K room staging photos for all products
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-charcoal/50 hover:text-charcoal hover:bg-beige/50 transition-colors cursor-pointer"
              title="Close modal"
              id="ai-modal-close-btn"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body - 2 Column Layout */}
          <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
            
            {/* Left Controls Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Product Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal/70">
                  Select Product to Stage ({PRODUCTS.length} Available)
                </label>
                <select
                  value={selectedProduct.id}
                  onChange={(e) => {
                    const found = PRODUCTS.find((p) => p.id === e.target.value);
                    if (found) {
                      setSelectedProduct(found);
                      if (onSelectProduct) onSelectProduct(found);
                    }
                  }}
                  className="w-full bg-ivory border border-[#E8DCCB] rounded-2xl px-3.5 py-2.5 text-xs font-bold text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta cursor-pointer"
                  id="ai-product-selector-dropdown"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.category} (₹{p.price.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>

                {/* Selected Product Miniature Info Card */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-beige/30 border border-[#E8DCCB]/60">
                  <div className="w-12 h-12 rounded-xl bg-ivory border border-[#E8DCCB] flex items-center justify-center shrink-0">
                    <AuraSVG type={selectedProduct.imageType} className="w-8 h-8 text-terracotta" />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-serif font-bold text-charcoal line-clamp-1">{selectedProduct.name}</p>
                    <p className="text-[11px] text-charcoal/60">Material: {selectedProduct.material}</p>
                    <p className="text-[11px] font-mono font-semibold text-terracotta">₹{selectedProduct.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>

              {/* Resolution / Image Size Selector (CRITICAL MANDATE) */}
              <div className="space-y-2" id="image-size-affordance-section">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal/70">
                    Image Quality / Resolution
                  </label>
                  <span className="text-[10px] font-mono font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">
                    gemini-3-pro Engine
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(['1K', '2K', '4K'] as ImageSizeOption[]).map((size) => {
                    const isSelected = imageSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setImageSize(size)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-terracotta text-white border-terracotta shadow-md ring-2 ring-terracotta/20'
                            : 'bg-ivory hover:bg-beige/40 text-charcoal border-[#E8DCCB]'
                        }`}
                        id={`size-btn-${size}`}
                      >
                        <div className="font-mono font-extrabold text-sm flex items-center justify-center gap-1">
                          {size}
                          {size === '4K' && <Sparkles size={11} className="text-amber-300" />}
                        </div>
                        <p className={`text-[10px] font-sans mt-0.5 ${isSelected ? 'text-white/80' : 'text-charcoal/60'}`}>
                          {size === '1K' ? '1024×1024' : size === '2K' ? '2048×2048' : '3840×3840 Ultra'}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Aspect Ratio Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal/70">
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['1:1', '16:9', '4:3', '3:4'] as AspectRatioOption[]).map((ratio) => {
                    const isSelected = aspectRatio === ratio;
                    return (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setAspectRatio(ratio)}
                        className={`py-2 px-1 rounded-xl border text-center text-xs font-mono font-bold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-charcoal text-white border-charcoal'
                            : 'bg-ivory hover:bg-beige/40 text-charcoal/80 border-[#E8DCCB]'
                        }`}
                      >
                        {ratio}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prompt Settings & Presets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal/70">
                    Staging Environment Prompt
                  </label>
                  <span className="text-[10px] text-charcoal/50">Optional custom prompt</span>
                </div>

                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. Set in a warm Scandinavian living room with soft daylight..."
                  rows={3}
                  className="w-full bg-ivory border border-[#E8DCCB] rounded-2xl p-3 text-xs text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-terracotta resize-none font-sans"
                  id="ai-prompt-textarea"
                />

                {/* Quick Presets */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[10px] font-mono text-charcoal/50">Quick Styling Presets:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {presets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleApplyPreset(preset.text)}
                        className="text-[10px] bg-beige/40 hover:bg-beige text-charcoal px-2.5 py-1 rounded-full border border-charcoal/10 transition-colors cursor-pointer"
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generate Trigger Button */}
              <button
                type="button"
                disabled={isGenerating}
                onClick={handleGenerate}
                className="w-full py-3.5 px-6 rounded-2xl bg-terracotta hover:bg-charcoal text-white font-serif font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                id="generate-image-submit-btn"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Rendering {imageSize} Photo...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Generate High-Res {imageSize} Photo</span>
                  </>
                )}
              </button>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 leading-relaxed font-sans">
                  <strong>Error:</strong> {errorMsg}
                </div>
              )}

            </div>

            {/* Right Preview Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              
              <div className="flex items-center justify-between pb-2 border-b border-charcoal/10">
                <h3 className="font-serif font-bold text-sm text-charcoal flex items-center gap-1.5">
                  <ImageIcon size={16} className="text-terracotta" />
                  Photorealistic Output Canvas
                </h3>
                {activeGeneratedImg && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sage/20 text-sage font-mono font-bold text-[10px]">
                    <Check size={11} /> {activeGeneratedImg.size} Render Complete
                  </span>
                )}
              </div>

              {/* Display Area */}
              <div className="relative flex-1 min-h-[320px] bg-ivory rounded-3xl border border-[#E8DCCB] overflow-hidden flex items-center justify-center group shadow-inner">
                {isGenerating ? (
                  /* Loading State */
                  <div className="p-8 text-center space-y-4 max-w-sm">
                    <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-terracotta/20 border-t-terracotta animate-spin" />
                      <Sparkles size={24} className="text-terracotta animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-serif font-bold text-sm text-charcoal">Rendering Photorealistic Scene</p>
                      <p className="text-xs text-charcoal/60 font-mono animate-pulse">{currentStepText}</p>
                    </div>
                  </div>
                ) : activeGeneratedImg ? (
                  /* Generated Image Active View */
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-2">
                    <img
                      src={activeGeneratedImg.url}
                      alt={activeGeneratedImg.prompt}
                      referrerPolicy="no-referrer"
                      className="max-h-[380px] w-auto object-contain rounded-2xl shadow-md transition-transform duration-300"
                    />

                    {/* Quality Overlay Badge */}
                    <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5">
                      <Sparkles size={11} className="text-amber-400" />
                      <span>{activeGeneratedImg.size} ({activeGeneratedImg.size === '4K' ? '3840×3840' : activeGeneratedImg.size === '2K' ? '2048×2048' : '1024×1024'})</span>
                    </div>

                    {/* Action floating bar on hover/always visible */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-white/90 backdrop-blur-md p-2.5 rounded-2xl border border-[#E8DCCB] shadow-lg">
                      <div className="text-[11px] text-charcoal/80 font-sans truncate max-w-[200px] sm:max-w-[280px]">
                        <span className="font-bold">{activeGeneratedImg.productName}: </span>
                        {activeGeneratedImg.prompt}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => setIsFullscreenView(true)}
                          className="p-2 rounded-xl bg-beige/50 hover:bg-beige text-charcoal text-xs font-bold transition-colors cursor-pointer"
                          title="View full screen"
                        >
                          <Maximize2 size={14} />
                        </button>
                        <button
                          onClick={() => handleCopyImageData(activeGeneratedImg)}
                          className="p-2 rounded-xl bg-beige/50 hover:bg-beige text-charcoal text-xs font-bold transition-colors cursor-pointer"
                          title="Copy image link"
                        >
                          {copiedLink ? <Check size={14} className="text-sage" /> : <Eye size={14} />}
                        </button>
                        <button
                          onClick={() => handleDownload(activeGeneratedImg)}
                          className="px-3 py-1.5 rounded-xl bg-terracotta hover:bg-charcoal text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Download size={13} />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Placeholder Empty State */
                  <div className="p-8 text-center space-y-3 max-w-sm text-charcoal/50">
                    <div className="w-16 h-16 rounded-full bg-beige/40 flex items-center justify-center mx-auto text-charcoal/40">
                      <Wand2 size={28} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-serif font-bold text-sm text-charcoal">Ready to Generate</p>
                      <p className="text-xs text-charcoal/60">
                        Choose resolution (1K, 2K, or 4K), prompt style, and click generate to create photorealistic staging photos for <strong>{selectedProduct.name}</strong>.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* History Gallery strip */}
              {generatedGallery.length > 0 && (
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-charcoal/50">
                    Session Generated Shots ({generatedGallery.length})
                  </p>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {generatedGallery.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveGeneratedImg(item)}
                        className={`relative w-16 h-16 rounded-xl border-2 overflow-hidden shrink-0 transition-all cursor-pointer ${
                          activeGeneratedImg?.id === item.id ? 'border-terracotta ring-2 ring-terracotta/20 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={item.url} alt={item.prompt} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 right-0 bg-charcoal text-white text-[8px] font-mono px-1 rounded-tl">
                          {item.size}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3 bg-ivory border-t border-[#E8DCCB] flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal/60 gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-sage" />
              <span>AuraNest AI Studio • Powered by Gemini 3 Pro Vision</span>
            </div>
            <button
              onClick={onClose}
              className="text-xs font-bold text-charcoal hover:text-terracotta transition-colors cursor-pointer"
            >
              Done / Close Studio
            </button>
          </div>

        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreenView && activeGeneratedImg && (
        <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreenView(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 cursor-pointer"
          >
            <X size={24} />
          </button>
          <img
            src={activeGeneratedImg.url}
            alt={activeGeneratedImg.prompt}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
          />
          <div className="absolute bottom-6 left-6 text-white font-sans text-xs bg-black/60 px-4 py-2 rounded-full backdrop-blur-md">
            {activeGeneratedImg.productName} • {activeGeneratedImg.size} Resolution Rendering
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
