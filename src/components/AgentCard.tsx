import { Phone, MessageCircle, Copy, ExternalLink, MapPin, Truck, Clock, CheckCircle2, Heart, Globe } from "lucide-react";
import { ShippingAgent } from "../data/agents";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AgentCardProps {
  agent: ShippingAgent;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export default function AgentCard({ agent, isFavorite, onToggleFavorite }: AgentCardProps) {
  const [copiedType, setCopiedType] = useState<"phone" | "whatsapp" | "chinaContact" | null>(null);

  const copyToClipboard = (text: string, type: "phone" | "whatsapp" | "chinaContact") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full"
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-slate-900">{agent.name}</h3>
              {agent.isVerified && (
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-[#1E88E5] rounded-full" title="Verified Agent">
                  <CheckCircle2 className="w-3 h-3 fill-current" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Verified</span>
                </div>
              )}
              <button 
                onClick={onToggleFavorite}
                className={`p-1.5 rounded-full transition-all ${
                  isFavorite 
                    ? "bg-pink-50 text-pink-500 shadow-sm" 
                    : "text-slate-300 hover:text-pink-400 hover:bg-pink-50"
                }`}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              </button>
            </div>
            <div className="flex items-center text-slate-500 text-sm">
              <MapPin className="w-4 h-4 mr-1 text-[#1E88E5]" />
              {agent.city}, {agent.country}
            </div>
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
            {agent.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-start gap-3">
            <div className="mt-1 p-1.5 bg-blue-50 rounded-lg">
              <MapPin className="w-4 h-4 text-[#1E88E5]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Address</p>
              <p className="text-sm text-slate-700">{agent.address}</p>
            </div>
          </div>

          {agent.chinaAddress && (
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1.5 bg-red-50 rounded-lg">
                <MapPin className="w-4 h-4 text-[#E53935]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">China Warehouse</p>
                <p className="text-sm text-slate-700">{agent.chinaAddress}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600">{agent.shippingType.join(" & ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600">{agent.deliveryTime}</span>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Contact Details</h4>
            
            <button
              onClick={() => copyToClipboard(agent.phone, "phone")}
              className="w-full flex items-center justify-between p-2.5 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-all group relative"
              title="Tap to Copy Phone"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                  <Phone className="w-4 h-4 text-[#1E88E5]" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Main Phone</p>
                  <p className="text-base font-mono font-bold text-slate-900">{agent.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  {copiedType === "phone" ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Copy className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#1E88E5]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {copiedType === "phone" && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap shadow-xl z-20">
                  Phone Copied!
                </span>
              )}
            </button>

            {agent.whatsapp && (
              <button
                onClick={() => copyToClipboard(agent.whatsapp!, "whatsapp")}
                className="w-full flex items-center justify-between p-2.5 bg-green-50/50 rounded-xl hover:bg-green-50 transition-all group relative"
                title="Tap to Copy WhatsApp"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">WhatsApp</p>
                    <p className="text-base font-mono font-bold text-slate-900">{agent.whatsapp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    {copiedType === "whatsapp" ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <Copy className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#25D366]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {copiedType === "whatsapp" && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap shadow-xl z-20">
                    WhatsApp Copied!
                  </span>
                )}
              </button>
            )}

            {agent.chinaContact && (
              <button
                onClick={() => copyToClipboard(agent.chinaContact!, "chinaContact")}
                className="w-full flex items-center justify-between p-2.5 bg-red-50/50 rounded-xl hover:bg-red-50 transition-all group relative"
                title="Tap to Copy China Contact"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm">
                    <Globe className="w-4 h-4 text-[#E53935]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">China Contact</p>
                    <p className="text-base font-mono font-bold text-slate-900">{agent.chinaContact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    {copiedType === "chinaContact" ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <Copy className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#E53935]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {copiedType === "chinaContact" && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap shadow-xl z-20">
                    China Contact Copied!
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <a
            href={`tel:${agent.phone}`}
            className="flex items-center justify-center gap-2 py-2.5 bg-[#1E88E5] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
          {agent.whatsapp ? (
            <a
              href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          ) : (
            <div className="flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-400 rounded-lg font-semibold cursor-not-allowed">
              <MessageCircle className="w-4 h-4" />
              N/A
            </div>
          )}
        </div>

        {agent.website && (
          <a
            href={agent.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 py-2 text-slate-500 text-sm hover:text-[#1E88E5] transition-colors"
          >
            Visit Website <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
