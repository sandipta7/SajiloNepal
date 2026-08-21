import React, { useState } from 'react';
import {
  AlertCircle,
  Camera,
  Check,
  ChevronRight,
  Crosshair,
  Image as ImageIcon,
  MapPin,
  Upload,
  X,
  Trash2,
  Car,
  Zap,
  Droplets,
  Construction,
  Lightbulb,
  AlertTriangle,
  Store,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { CATEGORIES_DATA, KATHMANDU_WARDS } from '../../data/initialData';
import { MapLeaflet } from '../map/MapLeaflet';

export const ReportIssue = () => {
  const { addNewIssue, openIssueDetail, setCurrentView } = useApp();

  const [category, setCategory] = useState('waste');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('high');
  const [locationName, setLocationName] = useState(
    'Baneshwor Chowk, Ward 10'
  );
  const [ward, setWard] = useState(
    KATHMANDU_WARDS[9] || 'Ward 10: Baneshwor'
  );
  const [municipality, setMunicipality] = useState(
    'Kathmandu Metropolitan City'
  );
  const [coordinates, setCoordinates] = useState({
    lat: 27.6915,
    lng: 85.342,
  });
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [previewSuccess, setPreviewSuccess] = useState(false);

  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'waste':
        return <Trash2 className="w-5 h-5 text-[#ba1a1a]" />;
      case 'roads':
        return <Construction className="w-5 h-5 text-[#b08d5b]" />;
      case 'traffic':
        return <Car className="w-5 h-5 text-[#e65100]" />;
      case 'power':
        return <Zap className="w-5 h-5 text-[#d97706]" />;
      case 'water':
        return <Droplets className="w-5 h-5 text-[#0284c7]" />;
      case 'streetlight':
        return <Lightbulb className="w-5 h-5 text-[#4f46e5]" />;
      case 'disaster':
        return <AlertTriangle className="w-5 h-5 text-[#dc2626]" />;
      case 'commerce':
        return <Store className="w-5 h-5 text-[#059669]" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-600" />;
    }
  };

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoordinates({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setLocationName(
            `Live GPS (${pos.coords.latitude.toFixed(
              4
            )}, ${pos.coords.longitude.toFixed(4)})`
          );
          setIsLocating(false);
        },
        () => {
          // Fallback to Kathmandu center
          setCoordinates({ lat: 27.7172, lng: 85.324 });
          setLocationName('Kathmandu Center (Live Pin)');
          setIsLocating(false);
        },
        { timeout: 8000 }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawResult = event.target?.result;
        if (!rawResult) return;

        // Downscale image to max 1200px and compress to lightweight JPEG
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const maxDimension = 1200;
            let width = img.width;
            let height = img.height;

            if (width > height && width > maxDimension) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else if (height > maxDimension) {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
            setImages((prev) => [optimizedDataUrl, ...prev.slice(0, 3)]);
          } catch {
            setImages((prev) => [rawResult, ...prev.slice(0, 3)]);
          }
        };
        img.onerror = () => {
          setImages((prev) => [rawResult, ...prev.slice(0, 3)]);
        };
        img.src = rawResult;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickSamplePhoto = (sampleUrl) => {
    setImages((prev) => [sampleUrl, ...prev.slice(0, 2)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please provide a title for the issue.');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = await addNewIssue({
        title,
        description: description || 'No further description provided.',
        category,
        severity,
        locationName,
        ward,
        municipality,
        coordinates,
        reporterName: reporterName.trim() || 'Anonymous Citizen',
        reporterPhone: reporterPhone.trim() || 'Not Provided',
        images,
      });

      // Trigger Confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#dc2626', '#16a34a', '#2563eb', '#d97706'],
        });
      } catch {
        // ignore
      }

      setIsSubmitting(false);
      setPreviewSuccess(true);

      setTimeout(() => {
        if (created?.id) {
          openIssueDetail(created.id);
        } else {
          setCurrentView('my-reports');
        }
      }, 700);
    } catch (err) {
      console.error('Failed to submit ticket:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="reportIssueView"
      className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-300"
    >
      {/* Header */}
      <div id="reportIssueHeader" className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#dc2626] uppercase tracking-wider mb-1">
          <AlertCircle className="w-4 h-4 text-[#dc2626]" />
          <span>Public Infrastructure Grievance</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Report an Issue
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Submit verified issues to municipal authorities for prompt dispatch
          and public tracking.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Category Selection */}
        <div
          id="reportCategoryCard"
          className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-xs"
        >
          <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
            1. Select Category *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {CATEGORIES_DATA.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  id={`catSelect-${cat.id}`}
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between gap-2 transition-all ${
                    isSelected
                      ? 'border-[#dc2626] bg-[#dc2626] text-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center ${
                        isSelected ? 'bg-white/20' : 'bg-white border border-slate-200 shadow-2xs'
                      }`}
                    >
                      {getCategoryIcon(cat.id)}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-semibold leading-snug">{cat.name}</p>
                    <p
                      className={`text-[10px] truncate ${
                        isSelected ? 'text-white/80' : 'text-slate-500'
                      }`}
                    >
                      {cat.nepaliName}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Issue Title & Details */}
        <div
          id="reportDetailsCard"
          className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-xs space-y-4"
        >
          <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider">
            2. Issue Details & Severity *
          </label>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Issue Title
            </label>
            <input
              id="issueTitleInput"
              type="text"
              required
              placeholder="e.g. Waste Overflow near Baneshwor High School"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#dc2626] focus:bg-white text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Description & Context
            </label>
            <textarea
              id="issueDescriptionInput"
              rows={3}
              placeholder="Describe the severity, hazards, length of time the problem has persisted, and any obstacles..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#dc2626] focus:bg-white text-slate-900 placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Severity selector */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Assessed Urgency / Priority Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'low', label: 'Low', desc: 'Minor issue' },
                { id: 'medium', label: 'Medium', desc: 'Needs attention' },
                { id: 'high', label: 'High', desc: 'Disruptive' },
                { id: 'critical', label: 'Critical', desc: 'Hazardous' },
              ].map((sev) => {
                const isSelected = severity === sev.id;
                return (
                  <button
                    type="button"
                    key={sev.id}
                    id={`severityOption-${sev.id}`}
                    onClick={() => setSeverity(sev.id)}
                    className={`py-2 px-3 rounded-lg border text-center transition-all ${
                      isSelected
                        ? sev.id === 'critical'
                          ? 'bg-[#dc2626] text-white border-[#dc2626] shadow-xs'
                          : sev.id === 'high'
                          ? 'bg-red-50 border-red-200 text-[#dc2626] font-semibold'
                          : sev.id === 'medium'
                          ? 'bg-yellow-50 border-yellow-200 text-yellow-800 font-semibold'
                          : 'bg-green-50 border-green-200 text-green-800 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <p className="text-xs font-bold uppercase">{sev.label}</p>
                    <p
                      className={`text-[10px] ${
                        isSelected && sev.id === 'critical'
                          ? 'text-white/80'
                          : 'text-slate-500'
                      }`}
                    >
                      {sev.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 3: Location & Leaflet Interactive Pin */}
        <div
          id="reportLocationCard"
          className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider">
              3. Location & Map Pinpoint *
            </label>
            <button
              type="button"
              id="gpsLocateBtn"
              onClick={handleGetCurrentLocation}
              disabled={isLocating}
              className="text-xs font-medium text-slate-700 hover:bg-slate-100 bg-slate-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-slate-200"
            >
              <Crosshair
                className={`w-3.5 h-3.5 text-[#dc2626] ${isLocating ? 'animate-spin' : ''}`}
              />
              <span>
                {isLocating ? 'Locating...' : 'Use Current GPS Location'}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Ward / Sub-region
              </label>
              <select
                id="wardSelectDropdown"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#dc2626] text-slate-900"
              >
                {KATHMANDU_WARDS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Specific Landmark / Street
              </label>
              <input
                id="locationNameInput"
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. Baneshwor Chowk, near Post Office"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#dc2626] text-slate-900"
              />
            </div>
          </div>

          {/* Interactive Leaflet Map for Pin Drag/Placement */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Click anywhere on the map or drag the pin:</span>
              <span className="font-mono">
                {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
              </span>
            </div>
            <div className="h-52 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
              <MapLeaflet
                issues={[]}
                onSelectIssue={() => {}}
                interactivePinPlacement={true}
                pinnedCoords={coordinates}
                onMapClick={(coords) => {
                  setCoordinates(coords);
                  setLocationName(
                    `Point near ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(
                      4
                    )}`
                  );
                }}
              />
            </div>
          </div>
        </div>

        {/* Step 4: Photo Proof & Camera Capture */}
        <div
          id="reportPhotoCard"
          className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-xs space-y-4"
        >
          <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider">
            4. Photo Proof (Civic Verification)
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Upload Box */}
            <label
              id="photoUploadBox"
              className="border-2 border-dashed border-slate-300 hover:border-[#dc2626] bg-slate-50 hover:bg-slate-100 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors text-center h-36"
            >
              <Upload className="w-6 h-6 text-slate-400 mb-1" />
              <p className="text-xs font-bold text-slate-900">Upload Photo</p>
              <p className="text-[10px] text-slate-500">Camera or file</p>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* Photo Previews */}
            {images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative h-36 rounded-xl overflow-hidden border border-slate-200 shadow-2xs group"
              >
                <img
                  src={imgUrl}
                  alt={`Proof preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== idx))
                  }
                  className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-1 left-2 text-[10px] bg-black/50 text-white px-1.5 py-0.5 rounded backdrop-blur-xs">
                  Evidence Photo
                </div>
              </div>
            ))}
          </div>

          {/* Quick preset Nepal samples */}
          <div className="flex items-center gap-2 pt-1 overflow-x-auto customScrollbar">
            <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">
              Or quick select sample proof:
            </span>
            <button
              type="button"
              onClick={() =>
                handleQuickSamplePhoto(
                  'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80'
                )
              }
              className="text-[10px] px-2.5 py-1 bg-slate-100 rounded-md font-medium text-slate-700 hover:bg-slate-200 whitespace-nowrap border border-slate-200"
            >
              Waste Overflow
            </button>
            <button
              type="button"
              onClick={() =>
                handleQuickSamplePhoto(
                  'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80'
                )
              }
              className="text-[10px] px-2.5 py-1 bg-slate-100 rounded-md font-medium text-slate-700 hover:bg-slate-200 whitespace-nowrap border border-slate-200"
            >
              Pothole Hazard
            </button>
            <button
              type="button"
              onClick={() =>
                handleQuickSamplePhoto(
                  'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80'
                )
              }
              className="text-[10px] px-2.5 py-1 bg-slate-100 rounded-md font-medium text-slate-700 hover:bg-slate-200 whitespace-nowrap border border-slate-200"
            >
              Water Pipeline
            </button>
          </div>
        </div>

        {/* Step 5: Reporter Contact */}
        <div
          id="reportCitizenCard"
          className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-xs space-y-4"
        >
          <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider">
            5. Citizen Contact Details
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Your Name
              </label>
              <input
                id="reporterNameInput"
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="Enter your name (or leave blank to submit anonymously)"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#dc2626] text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Phone Number (for municipal SMS updates)
              </label>
              <input
                id="reporterPhoneInput"
                type="tel"
                value={reporterPhone}
                onChange={(e) => setReporterPhone(e.target.value)}
                placeholder="e.g. 9841XXXXXX"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#dc2626] text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions Bar */}
        <div
          id="reportSubmitActionBar"
          className="flex items-center justify-between gap-4 pt-2"
        >
          <button
            type="button"
            onClick={() => setCurrentView('dashboard')}
            className="px-5 py-2.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>

          <button
            id="submitCivicReportBtn"
            type="submit"
            disabled={isSubmitting || previewSuccess}
            className="flex-1 sm:flex-initial bg-[#dc2626] text-white px-8 py-2.5 rounded-lg font-medium text-sm shadow-sm hover:bg-[#b91c1c] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Registering Report...</span>
            ) : previewSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Ticket Created!</span>
              </>
            ) : (
              <>
                <span>Submit Report to Authorities</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
