'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { HexColorPicker } from 'react-colorful';
import {
  ArrowLeft, Type, Image as ImageIcon, Layers, Save,
  ShoppingCart, ZoomIn, ZoomOut, Undo, Redo, Trash2,
  Copy, MoveUp, MoveDown, AlignLeft, AlignCenter, AlignRight, Minus, Plus
} from 'lucide-react';
import styles from './Editor.module.css';

type LayerType = 'image' | 'text';

interface Layer {
  id: string;
  type: LayerType;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string; // dataURL for image, text string for text
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  align?: string;
  rotation: number;
}

function uid() { return Math.random().toString(36).slice(2); }

export default function CustomizationEditor({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'design' | 'text' | 'layers'>('design');
  const [view, setView] = useState<'front' | 'back'>('front');
  const [zoom, setZoom] = useState(100);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [history, setHistory] = useState<Layer[][]>([[]]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Dragging state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [layerStartPos, setLayerStartPos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);
  const selected = layers.find(l => l.id === selectedId) ?? null;

  // History helpers
  const pushHistory = (newLayers: Layer[]) => {
    const trimmed = history.slice(0, historyIdx + 1);
    setHistory([...trimmed, newLayers]);
    setHistoryIdx(trimmed.length);
    setLayers(newLayers);
  };

  const undo = () => {
    if (historyIdx === 0) return;
    setHistoryIdx(i => i - 1);
    setLayers(history[historyIdx - 1]);
    setSelectedId(null);
  };

  const redo = () => {
    if (historyIdx >= history.length - 1) return;
    setHistoryIdx(i => i + 1);
    setLayers(history[historyIdx + 1]);
  };

  // Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, layer: Layer) => {
    e.stopPropagation();
    setSelectedId(layer.id);
    setDraggingId(layer.id);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setLayerStartPos({ x: layer.x, y: layer.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingId) return;
    const dx = e.clientX - dragStartPos.x;
    const dy = e.clientY - dragStartPos.y;
    const z = zoom / 100;
    setLayers(prev => prev.map(l => 
      l.id === draggingId ? { ...l, x: layerStartPos.x + dx/z, y: layerStartPos.y + dy/z } : l
    ));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingId) return;
    setDraggingId(null);
    e.currentTarget.releasePointerCapture(e.pointerId);
    pushHistory(layers);
  };

  // Drop to upload image
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const newLayer: Layer = {
        id: uid(), type: 'image',
        x: 60, y: 60, width: 120, height: 120,
        content: e.target?.result as string,
        rotation: 0,
      };
      pushHistory([...layers, newLayer]);
      setSelectedId(newLayer.id);
    };
    reader.readAsDataURL(file);
  }, [layers, history, historyIdx]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  const addText = () => {
    const newLayer: Layer = {
      id: uid(), type: 'text',
      x: 80, y: 80, width: 160, height: 40,
      content: 'Your Text Here',
      fontSize: 20, fontWeight: 'bold', color: '#021024', align: 'center',
      rotation: 0,
    };
    pushHistory([...layers, newLayer]);
    setSelectedId(newLayer.id);
    setActiveTab('text');
  };

  const updateSelected = (changes: Partial<Layer>) => {
    if (!selectedId) return;
    const newLayers = layers.map(l => l.id === selectedId ? { ...l, ...changes } : l);
    pushHistory(newLayers);
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    pushHistory(layers.filter(l => l.id !== selectedId));
    setSelectedId(null);
  };

  const duplicateSelected = () => {
    if (!selected) return;
    const clone: Layer = { ...selected, id: uid(), x: selected.x + 16, y: selected.y + 16 };
    pushHistory([...layers, clone]);
    setSelectedId(clone.id);
  };

  const moveLayer = (direction: 'up' | 'down') => {
    if (!selectedId) return;
    const idx = layers.findIndex(l => l.id === selectedId);
    if (direction === 'up' && idx < layers.length - 1) {
      const newL = [...layers];
      [newL[idx], newL[idx + 1]] = [newL[idx + 1], newL[idx]];
      pushHistory(newL);
    } else if (direction === 'down' && idx > 0) {
      const newL = [...layers];
      [newL[idx], newL[idx - 1]] = [newL[idx - 1], newL[idx]];
      pushHistory(newL);
    }
  };

  return (
    <div className={styles.editorContainer}>
      {/* Top Bar */}
      <header className={styles.topbar}>
        <div className={styles.left}>
          <Link href={`/product/${params.id}`} className={styles.backBtn}>
            <ArrowLeft size={18} /> Back to Product
          </Link>
          <div className={styles.divider} />
          <h1 className={styles.title}>Premium Heavyweight Hoodie</h1>
        </div>

        <div className={styles.centerControls}>
          <button className={styles.iconBtn} onClick={undo} disabled={historyIdx === 0} aria-label="Undo"><Undo size={18} /></button>
          <button className={styles.iconBtn} onClick={redo} disabled={historyIdx >= history.length - 1} aria-label="Redo"><Redo size={18} /></button>
          <div className={styles.divider} />
          <div className={styles.viewToggle}>
            <button className={`${styles.viewBtn} ${view === 'front' ? styles.activeView : ''}`} onClick={() => setView('front')}>Front</button>
            <button className={`${styles.viewBtn} ${view === 'back' ? styles.activeView : ''}`} onClick={() => setView('back')}>Back</button>
          </div>
        </div>

        <div className={styles.right}>
          <button className={styles.secondaryBtn}><Save size={16} />Save Design</button>
          <button className={styles.primaryBtn}><ShoppingCart size={16} />Add to Cart — $55.00</button>
        </div>
      </header>

      <div className={styles.mainLayout}>
        {/* Left Toolbar */}
        <aside className={styles.toolbar}>
          <div className={styles.tabs}>
            {(['design', 'text', 'layers'] as const).map(tab => (
              <button key={tab} className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`} onClick={() => setActiveTab(tab)}>
                {tab === 'design' && <ImageIcon size={20} />}
                {tab === 'text' && <Type size={20} />}
                {tab === 'layers' && <Layers size={20} />}
                <span style={{ textTransform: 'capitalize' }}>{tab}</span>
              </button>
            ))}
          </div>

          <div className={styles.panel}>
            {/* DESIGN TAB */}
            {activeTab === 'design' && (
              <div className={styles.uploadSection}>
                <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.dropzoneDragging : ''}`}>
                  <input {...getInputProps()} />
                  <ImageIcon size={32} className={styles.uploadIcon} />
                  <p>{isDragActive ? 'Drop image here…' : 'Drag & drop your image'}</p>
                  <span>or</span>
                  <button type="button" className={styles.uploadBtn}>Browse Files</button>
                </div>
                <p className={styles.uploadHint}>PNG, JPG, SVG — up to 10 MB. High resolution recommended.</p>

                {selected && (
                  <div className={styles.layerControls}>
                    <h4 className={styles.layerControlsTitle}>Selected Layer</h4>
                    <div className={styles.controlRow}>
                      <label>Rotation</label>
                      <input
                        type="range" min="-180" max="180"
                        value={selected.rotation}
                        onChange={e => updateSelected({ rotation: Number(e.target.value) })}
                        className={styles.range}
                      />
                      <span className={styles.rangeValue}>{selected.rotation}°</span>
                    </div>
                    <div className={styles.controlRow}>
                      <label>Width</label>
                      <input
                        type="range" min="40" max="300"
                        value={selected.width}
                        onChange={e => updateSelected({ width: Number(e.target.value) })}
                        className={styles.range}
                      />
                      <span className={styles.rangeValue}>{selected.width}px</span>
                    </div>
                    <div className={styles.layerActionBtns}>
                      <button className={styles.layerBtn} onClick={duplicateSelected}><Copy size={14} />Duplicate</button>
                      <button className={`${styles.layerBtn} ${styles.deleteBtn}`} onClick={deleteSelected}><Trash2 size={14} />Delete</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TEXT TAB */}
            {activeTab === 'text' && (
              <div className={styles.textSection}>
                <button className={styles.addTextBtn} onClick={addText}>
                  <Type size={16} /> Add Text Layer
                </button>

                {selected?.type === 'text' && (
                  <div className={styles.textControls}>
                    <div className={styles.propertiesGroup}>
                      <label>Content</label>
                      <input
                        type="text"
                        value={selected.content}
                        onChange={e => updateSelected({ content: e.target.value })}
                        className={styles.textInput}
                      />
                    </div>
                    <div className={styles.propertiesGroup}>
                      <label>Font Size</label>
                      <div className={styles.numberInput}>
                        <button onClick={() => updateSelected({ fontSize: Math.max(8, (selected.fontSize ?? 20) - 2) })}><Minus size={14} /></button>
                        <span>{selected.fontSize ?? 20}px</span>
                        <button onClick={() => updateSelected({ fontSize: (selected.fontSize ?? 20) + 2 })}><Plus size={14} /></button>
                      </div>
                    </div>
                    <div className={styles.propertiesGroup}>
                      <label>Font Weight</label>
                      <div className={styles.toggleGroup}>
                        {['400', '600', 'bold'].map(w => (
                          <button
                            key={w}
                            className={`${styles.toggleBtn} ${selected.fontWeight === w ? styles.toggleBtnActive : ''}`}
                            onClick={() => updateSelected({ fontWeight: w })}
                            style={{ fontWeight: w === 'bold' ? 'bold' : Number(w) }}
                          >
                            {w === '400' ? 'Reg' : w === '600' ? 'Semi' : 'Bold'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.propertiesGroup}>
                      <label>Alignment</label>
                      <div className={styles.toggleGroup}>
                        <button className={`${styles.toggleBtn} ${selected.align === 'left' ? styles.toggleBtnActive : ''}`} onClick={() => updateSelected({ align: 'left' })}><AlignLeft size={14} /></button>
                        <button className={`${styles.toggleBtn} ${selected.align === 'center' ? styles.toggleBtnActive : ''}`} onClick={() => updateSelected({ align: 'center' })}><AlignCenter size={14} /></button>
                        <button className={`${styles.toggleBtn} ${selected.align === 'right' ? styles.toggleBtnActive : ''}`} onClick={() => updateSelected({ align: 'right' })}><AlignRight size={14} /></button>
                      </div>
                    </div>
                    <div className={styles.propertiesGroup}>
                      <label>Text Color</label>
                      <div className={styles.colorPickerRow}>
                        <button
                          className={styles.colorSwatch}
                          style={{ backgroundColor: selected.color ?? '#021024' }}
                          onClick={() => setShowColorPicker(p => !p)}
                        />
                        <span className={styles.colorHex}>{selected.color ?? '#021024'}</span>
                      </div>
                      {showColorPicker && (
                        <div className={styles.colorPickerPopup}>
                          <HexColorPicker
                            color={selected.color ?? '#021024'}
                            onChange={color => updateSelected({ color })}
                          />
                        </div>
                      )}
                    </div>
                    <div className={styles.layerActionBtns}>
                      <button className={styles.layerBtn} onClick={duplicateSelected}><Copy size={14} />Duplicate</button>
                      <button className={`${styles.layerBtn} ${styles.deleteBtn}`} onClick={deleteSelected}><Trash2 size={14} />Delete</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* LAYERS TAB */}
            {activeTab === 'layers' && (
              <div className={styles.layersSection}>
                {layers.length === 0 ? (
                  <p className={styles.emptyLayers}>No layers yet. Add an image or text to begin.</p>
                ) : (
                  <ul className={styles.layerList}>
                    {[...layers].reverse().map((layer, ri) => {
                      const realIdx = layers.length - 1 - ri;
                      return (
                        <li
                          key={layer.id}
                          className={`${styles.layerItem} ${layer.id === selectedId ? styles.selectedLayer : ''}`}
                          onClick={() => { setSelectedId(layer.id); setActiveTab(layer.type === 'text' ? 'text' : 'design'); }}
                        >
                          <span className={styles.layerIcon}>{layer.type === 'text' ? <Type size={14} /> : <ImageIcon size={14} />}</span>
                          <span className={styles.layerLabel}>{layer.type === 'text' ? layer.content.slice(0, 18) : `Image ${realIdx + 1}`}</span>
                          <div className={styles.layerOrderBtns}>
                            <button onClick={e => { e.stopPropagation(); moveLayer('up'); }}><MoveUp size={12} /></button>
                            <button onClick={e => { e.stopPropagation(); moveLayer('down'); }}><MoveDown size={12} /></button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Canvas Area */}
        <main className={styles.canvasArea} onClick={() => setSelectedId(null)}>
          <div className={styles.canvasWrapper}>
            <div className={styles.mockupContainer} style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}>
              <div className={styles.mockupPlaceholder}>
                <Image src="/hoodie.png" alt="Mockup" fill className={styles.mockupImg} />
              </div>

              {/* Safe Print Area */}
              <div className={styles.safeArea}>
                <span className={styles.safeAreaLabel}>Print Area</span>
                <div ref={canvasRef} className={styles.userCanvas} onClick={e => e.stopPropagation()}>
                  {layers.map(layer => (
                    <div
                      key={layer.id}
                      className={`${styles.layerEl} ${layer.id === selectedId ? styles.layerElSelected : ''}`}
                      style={{
                        position: 'absolute',
                        left: layer.x,
                        top: layer.y,
                        width: layer.width,
                        height: layer.type === 'text' ? 'auto' : layer.height,
                        transform: `rotate(${layer.rotation}deg)`,
                        cursor: 'move',
                      }}
                      onPointerDown={e => handlePointerDown(e, layer)}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                    >
                      {layer.type === 'image' ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={layer.content} alt="layer" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                      ) : (
                        <p style={{
                          fontSize: layer.fontSize,
                          fontWeight: layer.fontWeight as React.CSSProperties['fontWeight'],
                          color: layer.color,
                          textAlign: layer.align as React.CSSProperties['textAlign'],
                          margin: 0,
                          userSelect: 'none',
                          lineHeight: 1.2,
                        }}>
                          {layer.content}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className={styles.zoomControls}>
              <button className={styles.iconBtn} onClick={() => setZoom(z => Math.max(50, z - 10))}><ZoomOut size={16} /></button>
              <span className={styles.zoomLevel}>{zoom}%</span>
              <button className={styles.iconBtn} onClick={() => setZoom(z => Math.min(200, z + 10))}><ZoomIn size={16} /></button>
            </div>
          </div>
        </main>

        {/* Right: Product Options */}
        <aside className={styles.productOptions}>
          <h3>Product Options</h3>
          <div className={styles.optionGroup}>
            <label>Color</label>
            <div className={styles.colorGrid}>
              {['#000000', '#052659', '#E5E7EB', '#065F46'].map(color => (
                <button key={color} className={styles.colorBtn} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          <div className={styles.optionGroup}>
            <label>Size</label>
            <div className={styles.sizeGrid}>
              {['S', 'M', 'L', 'XL'].map(size => (
                <button key={size} className={styles.sizeBtn}>{size}</button>
              ))}
            </div>
          </div>
          <div className={styles.summaryBox}>
            <div className={styles.summaryRow}><span>Base Cost</span><span>$45.00</span></div>
            <div className={styles.summaryRow}><span>Print ({layers.length} {layers.length === 1 ? 'layer' : 'layers'})</span><span>$10.00</span></div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}><span>Total</span><span>$55.00</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
