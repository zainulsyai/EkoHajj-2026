
import React, { useState } from 'react';
import { Toggle } from '../../components/InputFields';
import { Save, Store, Plus, Trash2, ArrowLeft, MapPin, User, Calendar, Building, ShoppingBag, TrendingUp, DollarSign, Clock, FileText, Layers, Tag, RotateCcw, Send } from 'lucide-react';
import { TenantRecord } from '../../types';
import { useData } from '../../contexts/DataContext';

interface TenantFormProps {
    onBack: () => void;
}

export const TenantForm: React.FC<TenantFormProps> = ({ onBack }) => {
  const { tenantData, setTenantData } = useData();

  const [hotelName, setHotelName] = useState(''); 
  const [address, setAddress] = useState(''); 
  const [sector, setSector] = useState(''); 
  const [surveyor, setSurveyor] = useState(''); 
  const [surveyDate, setSurveyDate] = useState(''); 
  const [surveyTime, setSurveyTime] = useState(''); 

  // Sync identity
  const updateIdentity = (field: keyof TenantRecord, value: string) => {
    setTenantData(prev => prev.map(r => ({ ...r, [field]: value })));
  };

  const handleRecordChange = (id: number, field: keyof TenantRecord, value: string) => {
    setTenantData(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const addRecord = () => {
    const newId = tenantData.length > 0 ? Math.max(...tenantData.map(r => r.id)) + 1 : 1;
    setTenantData([...tenantData, { 
        id: newId, 
        shopName: '', productType: '', bestSeller: '', rentCost: '',
        // Pre-fill identity
        hotelName, address, sector, surveyor, date: surveyDate, time: surveyTime
    }]);
  };

  const removeRecord = (id: number) => setTenantData(tenantData.filter(r => r.id !== id));

  // ACTIONS
  const handleReset = () => {
    if(window.confirm('Hapus semua data di form ini?')) {
       setHotelName(''); setAddress(''); setSector(''); setSurveyor(''); setSurveyDate(''); setSurveyTime('');
    }
  };
  const handleDraft = () => alert('Data disimpan sebagai draft');
  const handleSubmit = () => {
    onBack();
  };

  const getDateValue = (dateStr: string) => {
      if (!dateStr) return '';
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}`;
  };
  const handleDateChange = (val: string) => {
      if (!val) { setSurveyDate(''); updateIdentity('date', ''); return; }
      const [year, month, day] = val.split('-');
      const formatted = `${day}/${month}/${year}`;
      setSurveyDate(formatted);
      updateIdentity('date', formatted);
  };
  const getTimeValue = (timeStr: string) => (timeStr ? timeStr.replace('.', ':') : '');
  const handleTimeChange = (val: string) => {
      const formatted = val.replace(':', '.');
      setSurveyTime(formatted);
      updateIdentity('time', formatted);
  };

  // THEME COLOR: BLUE #1E3A8A
  const THEME_COLOR = '#1E3A8A';

  return (
    <div className="flex flex-col relative font-sans bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-2xl overflow-hidden animate-fade-in-up">
      <div className="relative z-20 bg-white/40 backdrop-blur-lg border-b border-white/50 px-8 py-6 overflow-hidden">
         {/* Watermark */}
         <div className="absolute top-[-20%] right-[-5%] text-[#1E3A8A] opacity-5 pointer-events-none transform rotate-12 scale-150">
           <Store size={300} strokeWidth={0.5} />
         </div>

         <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 relative z-10">
             <div className="flex items-center gap-6">
                 <button onClick={onBack} className="p-3 rounded-2xl hover:bg-white text-gray-500 hover:text-[#1E3A8A] transition-all border border-transparent hover:border-gray-200"><ArrowLeft size={22} /></button>
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-[#1E3A8A]/20 bg-gradient-to-br from-[#1E3A8A] to-[#172554] text-white ring-4 ring-white/50">
                        <Store size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#1E3A8A] font-playfair leading-tight">Potensi Ekonomi (Tenant)</h1>
                        <div className="flex items-center gap-2">
                             <span className="px-2 py-0.5 rounded-full bg-[#1E3A8A]/10 border border-[#1E3A8A]/20 text-[10px] font-bold text-[#1E3A8A] uppercase tracking-widest">Survei Hotel & Toko</span>
                        </div>
                    </div>
                 </div>
             </div>
             
             {/* Action Buttons */}
            <div className="flex items-center gap-3 self-end xl:self-auto">
                <button 
                    onClick={handleReset} 
                    className="group flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5 active:scale-95"
                >
                    <RotateCcw size={16} className="group-hover:-rotate-180 transition-transform duration-500" /> 
                    <span className="hidden sm:inline">Reset Form</span>
                </button>

                <button 
                    onClick={handleDraft} 
                    className="group flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-br from-[#D4AF37] to-[#B4941F] hover:from-[#c4a02f] hover:to-[#967a15] transition-all duration-300 shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 hover:-translate-y-0.5 active:scale-95"
                >
                    <Save size={16} /> <span>Simpan Draft</span>
                </button>

                <button 
                    onClick={handleSubmit} 
                    className="group flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-br from-[#064E3B] to-[#042f24] hover:from-[#053d2e] hover:to-[#064E3B] transition-all duration-300 shadow-lg shadow-[#064E3B]/30 hover:shadow-[#064E3B]/50 hover:-translate-y-0.5 active:scale-95"
                >
                    <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /> 
                    <span>Submit Laporan</span>
                </button>
            </div>
         </div>

         <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm relative z-10">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/50">
                <div className="p-2 bg-[#1E3A8A]/10 rounded-xl"><FileText size={18} className="text-[#1E3A8A]" /></div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">A. Identitas Lokasi & Petugas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PremiumInput label="1. Nama Hotel" icon={Building} value={hotelName} onChange={(v: string) => { setHotelName(v); updateIdentity('hotelName', v); }} placeholder="Nama Hotel..." />
                  <PremiumInput label="2. Alamat" icon={MapPin} value={address} onChange={(v: string) => { setAddress(v); updateIdentity('address', v); }} placeholder="Alamat..." />
                  <PremiumInput label="3. Sektor" icon={Layers} value={sector} onChange={(v: string) => { setSector(v); updateIdentity('sector', v); }} placeholder="Sektor..." />
                  <PremiumInput label="4. Surveyor" icon={User} value={surveyor} onChange={(v: string) => { setSurveyor(v); updateIdentity('surveyor', v); }} placeholder="Nama Surveyor..." />
                  <PremiumInput label="5. Tanggal Survei" icon={Calendar} type="date" value={getDateValue(surveyDate)} onChange={handleDateChange} />
                  <PremiumInput label="6. Waktu Survei" icon={Clock} type="time" value={getTimeValue(surveyTime)} onChange={handleTimeChange} />
              </div>
         </div>
      </div>

      <div className="p-8">
        {/* Section B Header */}
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#1E3A8A] rounded-xl shadow-lg shadow-[#1E3A8A]/20"><Store size={20} className="text-white" /></div>
              <div>
                  <h3 className="text-lg font-bold text-[#1E3A8A] font-playfair">B. Potensi Ekonomi Haji</h3>
                  <p className="text-xs text-gray-500 font-medium tracking-wide">Daftar toko dan tenant di sekitar hotel</p>
              </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
            {tenantData.map((record, idx) => (
                <div key={record.id} className="relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                   <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D4AF37] rounded-l-3xl"></div>
                   <button onClick={() => removeRecord(record.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all bg-red-50 p-2 rounded-lg"><Trash2 size={16} /></button>
                   <div className="flex items-center gap-3 mb-6 pl-2">
                       <span className="text-xs font-bold text-[#1E3A8A] bg-[#1E3A8A]/10 px-2.5 py-1.5 rounded-lg">Tenant #{idx + 1}</span>
                   </div>
                   <div className="space-y-4">
                       <CardInput icon={Store} placeholder="Nama Toko / Tenant" value={record.shopName} onChange={(e: any) => handleRecordChange(record.id, 'shopName', e.target.value)} />
                       <div className="grid grid-cols-2 gap-4">
                           <CardInput icon={Tag} placeholder="Jenis Produk" value={record.productType} onChange={(e: any) => handleRecordChange(record.id, 'productType', e.target.value)} />
                           <CardInput icon={TrendingUp} placeholder="Produk Terlaris" value={record.bestSeller} onChange={(e: any) => handleRecordChange(record.id, 'bestSeller', e.target.value)} />
                       </div>
                       <CardInput icon={DollarSign} placeholder="Biaya Sewa (SAR)" type="number" value={record.rentCost} onChange={(e: any) => handleRecordChange(record.id, 'rentCost', e.target.value)} highlight />
                   </div>
                </div>
            ))}
            <button onClick={addRecord} className="flex flex-col items-center justify-center min-h-[200px] border-2 border-dashed border-gray-200 rounded-3xl hover:bg-[#1E3A8A]/5 transition-all text-gray-400 font-bold gap-3 group">
                <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 shadow-sm group-hover:scale-110 transition-transform"><Plus size={24} /></div>
                Tambah Tenant Baru
            </button>
        </div>
      </div>
    </div>
  );
};

const PremiumInput = ({ label, icon: Icon, type = "text", value, onChange, placeholder }: any) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-[#1E3A8A] transition-colors">
      <Icon size={12} className="text-gray-300 group-focus-within:text-[#D4AF37] transition-colors" /> {label}
    </label>
    <input 
        type={type} 
        value={value} 
        onChange={e => {
            const val = e.target.value;
            onChange(type === 'text' ? val.replace(/\b\w/g, c => c.toUpperCase()) : val);
        }} 
        className="w-full text-sm font-semibold text-gray-700 bg-white/60 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/5 outline-none transition-all placeholder:text-gray-300" 
        placeholder={placeholder} 
    />
  </div>
);

const CardInput = ({ icon: Icon, value, onChange, placeholder, type = "text", highlight = false }: any) => (
    <div className="relative group/input">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-[#1E3A8A] transition-colors">
            <Icon size={16} className={highlight ? 'text-[#D4AF37]' : ''} />
        </div>
        <input 
            type={type} 
            value={value} 
            onChange={(e) => {
                if (type === 'text') {
                    e.target.value = e.target.value.replace(/\b\w/g, c => c.toUpperCase());
                }
                onChange(e);
            }} 
            placeholder={placeholder}
            className={`w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 pl-10 text-sm font-semibold text-gray-700 focus:bg-white focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 outline-none transition-all placeholder:text-gray-300 ${highlight ? 'text-[#1E3A8A]' : ''}`}
        />
    </div>
);
