'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/shared/supabase';
import { CatalogSidebar } from '@/widgets/sidebar/Sidebar';

interface Product {
  id: number | string;
  name: string;
  price: number;
  season?: string;
  brand?: string; 
  weight?: string; 
  surface?: string;
  image?: string;
  images?: string[];
  description?: string;
}

const STORAGE_BUCKET = 'products-images'; // <-- Укажи точное имя твоего бакета в Supabase Storage

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [shoes, setShoes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('BMAI');
const [weight, setWeight] = useState('');
const [surface, setSurface] = useState('');
  const [season, setSeason] = useState('');
  const [description, setDescription] = useState('');
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError('Неверный логин или пароль');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase.from('products').select('*').order('id', { ascending: false });

      if (selectedSeason.length > 0) {
        query = query.in('season', selectedSeason);
      }

      const { data, error } = await query;
      if (error) throw error;
      if (data) setShoes(data);
    } catch (error) {
      console.error('Ошибка при загрузке кроссовок:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchProducts();
    }
  }, [selectedSeason, session]);

  const toggleSeasonFilter = (seasonName: string) => {
    setSelectedSeason((prev) =>
      prev.includes(seasonName) ? prev.filter((s) => s !== seasonName) : [...prev, seasonName]
    );
  };
  const openCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setPrice('');
    setSeason('');
    setBrand('BMAI'); 
  setWeight('');  
  setSurface('');
    setDescription('');
    setExistingImages([]);
    setNewFiles([]);
    setIsModalOpen(true);
  };

  const openEditModal = (shoe: Product) => {
    setEditingProduct(shoe);
    setName(shoe.name || '');
    setPrice(String(shoe.price || ''));
    setSeason(shoe.season || '');
    setDescription(shoe.description || '');
    setBrand(shoe.brand || 'BMAI');  
  setWeight(shoe.weight || '');   
  setSurface(shoe.surface || '');
    const currentImgs = shoe.images?.length ? shoe.images : shoe.image ? [shoe.image] : [];
    setExistingImages(currentImgs);
    setNewFiles([]);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number | string, productName: string) => {
    if (!window.confirm(`Точно удалить "${productName}"?`)) return;

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      alert('Ошибка при удалении: ' + error.message);
      return;
    }
    setShoes((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of newFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `sneakers/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(filePath);

        uploadedUrls.push(urlData.publicUrl);
      }

      const finalImages = [...existingImages, ...uploadedUrls];

      const payload = {
        name,
        price: Number(price),
        season: season || null,
        specs:{ brand: brand || null,      
  weight: weight || null,     
  surface: surface || null}
       ,
        description: description || null,
        image: finalImages[0] || null, 
        images: finalImages,          
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([payload]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      alert('Ошибка при сохранении: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center text-blue-600">Проверка доступа...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-5">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Вход в панель BMAI Astana</h1>
          {authError && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center">{authError}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="admin@bmai-astana.shop"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Войти
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Управление товарами</h1>
          <p className="text-sm text-gray-500">Авторизован: {session.user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors shadow-sm"
          >
            + Добавить товар
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
          >
            Выйти
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-64 shrink-0">
          <CatalogSidebar
            selectedSeason={selectedSeason}
            toggleSeasonFilter={toggleSeasonFilter}
          />
        </div>

        <div className="flex-1 w-full">
          {loading ? (
            <div className="text-center py-20 text-blue-600 font-medium">Загрузка товаров...</div>
          ) : shoes.length === 0 ? (
            <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100">
              Товары не найдены
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {shoes.map((shoe) => (
                <article
                  key={shoe.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full h-52 bg-gray-50 rounded-xl overflow-hidden mb-4 relative">
                      <img
                        src={shoe.image || shoe.images?.[0] || '/placeholder.png'}
                        alt={shoe.name}
                        className="w-full h-full object-cover object-center"
                      />
                      {shoe.images && shoe.images.length > 1 && (
                        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
                          +{shoe.images.length - 1} фото
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 mb-6">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                        {shoe.name}
                      </h3>
                      <p className="text-xl font-extrabold text-blue-600">
                        {shoe.price.toLocaleString()} ₸
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openEditModal(shoe)}
                      className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDelete(shoe.id, shoe.name)}
                      className="py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-xl transition-colors"
                    >
                      Удалить
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProduct ? 'Редактировать кроссовки' : 'Новые кроссовки'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Название модели</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Цена (₸)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Сезон</label>
                  <input
                    type="text"
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    placeholder="Лето / Зима / Демисезон"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
              </div>
<div className="grid grid-cols-3 gap-3">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Бренд</label>
    <input
      type="text"
      value={brand}
      onChange={(e) => setBrand(e.target.value)}
      placeholder="BMAI"
      className="w-full px-3.5 py-2 border border-gray-300 rounded-xl outline-none focus:border-blue-600"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Вес</label>
    <input
      type="text"
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
      placeholder="230g"
      className="w-full px-3.5 py-2 border border-gray-300 rounded-xl outline-none focus:border-blue-600"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Покрытие</label>
    <input
      type="text"
      value={surface}
      onChange={(e) => setSurface(e.target.value)}
      placeholder="Asphalt / Trail"
      className="w-full px-3.5 py-2 border border-gray-300 rounded-xl outline-none focus:border-blue-600"
    />
  </div>
</div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              {existingImages.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Загруженные фото (нажми ✕ чтобы убрать)</label>
                  <div className="flex flex-wrap gap-2">
                    {existingImages.map((url, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setExistingImages((prev) => prev.filter((_, i) => i !== idx))}
                          className="absolute top-0.5 right-0.5 bg-red-600 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Добавить фото расцветок (можно выбрать сразу несколько)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setNewFiles(Array.from(e.target.files || []))}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium"
                >
                  {saving ? 'Сохранение...' : 'Сохранить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}