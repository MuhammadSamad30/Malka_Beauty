'use client';

import { useEffect, useState } from 'react';
import { Check, Save, X } from 'lucide-react';
import type { CustomerDetails } from '@/lib/whatsapp';

type DeliveryDetails = Pick<CustomerDetails, 'name' | 'phone' | 'address' | 'city'>;
type ToastState =
  | { type: 'prompt'; details: DeliveryDetails }
  | { type: 'message'; text: string; success: boolean };

const STORAGE_KEY = 'malka_saved_delivery_details';

function readSavedDetails(): DeliveryDetails | null {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!value || typeof value !== 'object') return null;
    const details = value as Partial<DeliveryDetails>;
    if (![details.name, details.phone, details.address, details.city].every((field) => typeof field === 'string' && field.trim())) return null;
    return {
      name: details.name!.trim(),
      phone: details.phone!.trim(),
      address: details.address!.trim(),
      city: details.city!.trim(),
    };
  } catch {
    return null;
  }
}

export default function SavedCustomerDetails({
  values,
  onUse,
}: {
  values: DeliveryDetails;
  onUse: (details: DeliveryDetails) => void;
}) {
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    const savedDetails = readSavedDetails();
    if (savedDetails) setToast({ type: 'prompt', details: savedDetails });
  }, []);

  const saveDetails = () => {
    const details = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
      city: values.city.trim(),
    };

    if (!Object.values(details).every(Boolean)) {
      setToast({ type: 'message', text: 'Fill in your name, phone, address, and city before saving.', success: false });
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
      setToast({ type: 'message', text: 'Your delivery details are saved on this device.', success: true });
    } catch {
      setToast({ type: 'message', text: 'Could not save details on this device.', success: false });
    }
  };

  return <>
    <div className="flex flex-col gap-3 rounded-xl border border-[#e9e1d7] bg-[#f8f5ef] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-[#30231e]">Save delivery details for next time</p>
        <p className="mt-1 text-xs text-gray-600">Only saved if you choose to save them.</p>
      </div>
      <button type="button" onClick={saveDetails} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#a45c49] px-4 py-2 text-sm font-semibold text-[#69372e] transition hover:bg-[#69372e] hover:text-white">
        <Save size={15} /> Save details
      </button>
    </div>

    {toast && <div role="status" aria-live="polite" className="fixed bottom-5 left-4 right-4 z-[100] mx-auto max-w-md rounded-2xl border border-[#e9e1d7] bg-white p-4 text-[#30231e] shadow-[0_18px_50px_-20px_rgba(0,0,0,.4)] sm:left-auto sm:right-6">
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${toast.type === 'prompt' ? 'bg-[#f3eee6] text-[#69372e]' : toast.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {toast.type === 'prompt' ? <Save size={16} /> : toast.success ? <Check size={16} /> : <X size={16} />}
        </span>
        <div className="min-w-0 flex-1">
          {toast.type === 'prompt' ? <>
            <p className="text-sm font-semibold">Use your saved delivery details?</p>
            <p className="mt-1 text-xs leading-5 text-gray-600">We can fill in your name, phone, address, and city.</p>
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={() => { onUse(toast.details); setToast(null); }} className="rounded-full bg-[#69372e] px-4 py-2 text-xs font-semibold text-white hover:bg-[#a45c49]">Use saved details</button>
              <button type="button" onClick={() => setToast(null)} className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">Not now</button>
            </div>
          </> : <p className="pt-1 text-sm font-medium">{toast.text}</p>}
        </div>
        {toast.type === 'message' && <button type="button" onClick={() => setToast(null)} aria-label="Dismiss notification" className="rounded-full p-1 text-gray-500 hover:bg-gray-100"><X size={16} /></button>}
      </div>
    </div>}
  </>;
}
