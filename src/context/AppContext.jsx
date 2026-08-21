import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  INITIAL_ISSUES,
  INITIAL_NOTIFICATIONS,
  INITIAL_RESPONDERS,
} from '../data/initialData';
import {
  subscribeToIssues,
  subscribeToNotifications,
  saveIssueToFirestore,
  updateIssueInFirestore,
  saveNotificationToFirestore,
  updateNotificationInFirestore,
  seedInitialIssuesIfEmpty,
  uploadImageToStorage,
} from '../lib/firestoreService';

const AppContext = createContext(null);

const STORAGE_KEY_PORTAL = 'solve_nepal_portal_v2';
const STORAGE_KEY_ISSUES = 'solve_nepal_issues_v2';
const STORAGE_KEY_NOTIFS = 'solve_nepal_notifs_v2';
const STORAGE_KEY_ROLE = 'solve_nepal_role_v2';
const STORAGE_KEY_ADMIN_AUTH = 'solve_nepal_admin_auth_v2';
const STORAGE_KEY_LIKED_ISSUES = 'solve_nepal_liked_issues_v2';

// Known admin and officer accounts for authenticating municipal personnel
const ADMIN_ACCOUNTS = [
  {
    email: 'admin@kathmandu.gov.np',
    password: 'nepal2025',
    name: 'Central Executive Officer',
    role: 'Super Admin',
    department: 'KMC Central Executive Office',
    badgeNumber: 'KMC-EXEC-001',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  },
  {
    email: 'ramesh.ward10@kathmandu.gov.np',
    password: 'officer123',
    name: 'Ramesh Shrestha',
    role: 'Field Dispatcher',
    department: 'Ward 10 Quick Response Unit',
    badgeNumber: 'KMC-W10-042',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  },
  {
    email: 'sunita.waste@kmc.gov.np',
    password: 'waste2025',
    name: 'Sunita Gurung',
    role: 'Chief Sanitation Inspector',
    department: 'KMC Environment & Waste Dept',
    badgeNumber: 'KMC-ENV-018',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
  },
  {
    email: 'prakash.roads@kmc.gov.np',
    password: 'roads123',
    name: 'Er. Prakash Adhikari',
    role: 'Senior Civil Infrastructure Engineer',
    department: 'Department of Roads & Municipal Infrastructure',
    badgeNumber: 'KMC-RDS-009',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  },
  {
    email: 'sita.traffic@kmc.gov.np',
    password: 'traffic123',
    name: 'Inspector Sita KC',
    role: 'Traffic & Signals Safety Coordinator',
    department: 'Kathmandu Valley Traffic Police Division',
    badgeNumber: 'KMC-TRF-022',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
  },
  {
    email: 'bikram.power@nea.gov.np',
    password: 'power123',
    name: 'Bikram Thapa',
    role: 'Grid & Electrical Field Engineer',
    department: 'Nepal Electricity Authority (NEA) Distribution',
    badgeNumber: 'NEA-ELEC-104',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  },
  {
    email: 'deepak.water@kukl.gov.np',
    password: 'water123',
    name: 'Deepak Raj Regmi',
    role: 'Hydraulic & Pipeline Supervisor',
    department: 'Kathmandu Upatyaka Khanepani Limited (KUKL)',
    badgeNumber: 'KUKL-WTR-077',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
  },
];

// Helper to generate clean, observable sequential IDs (e.g. issue-1, issue-2, issue-3...)
export const generateNextIssueId = (existingIssues = []) => {
  const existingIds = new Set((existingIssues || []).map((i) => i?.id));

  // Extract all existing clean integer indices from issue-N
  const existingIndices = (existingIssues || [])
    .map((item) => {
      const match = String(item?.id || '').match(/^issue-(\d+)$/i);
      if (!match) return null;
      const num = parseInt(match[1], 10);
      // Filter out raw epoch timestamps (e.g. 1787292002559)
      return num < 10000000 ? num : null;
    })
    .filter((num) => num !== null && !isNaN(num));

  let nextIndex = existingIndices.length > 0 ? Math.max(...existingIndices) + 1 : 1;
  while (existingIds.has(`issue-${nextIndex}`)) {
    nextIndex++;
  }
  return `issue-${nextIndex}`;
};

export const AppProvider = ({ children }) => {
  // Check initial portal from URL and localStorage
  const getInitialPortalFromURL = () => {
    if (typeof window === 'undefined') return 'gateway';
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    const path = window.location.pathname.toLowerCase();

    if (
      hash.startsWith('#/admin') ||
      hash.startsWith('#admin') ||
      search.includes('portal=admin') ||
      search.includes('admin=true') ||
      path.startsWith('/admin')
    ) {
      return 'admin';
    }

    if (
      hash.startsWith('#/dashboard') ||
      hash.startsWith('#/explore-map') ||
      hash.startsWith('#/report-issue') ||
      hash.startsWith('#/my-reports') ||
      hash.startsWith('#/issue-detail') ||
      hash.startsWith('#/how-it-works') ||
      hash.startsWith('#/citizen')
    ) {
      return 'citizen';
    }

    if (hash.startsWith('#/gateway') || hash.startsWith('#gateway')) {
      return 'gateway';
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY_PORTAL);
      if (saved === 'citizen' || saved === 'admin' || saved === 'gateway') {
        return saved;
      }
    } catch {
      // ignore
    }

    return 'gateway';
  };

  const getInitialCitizenViewFromURL = () => {
    if (typeof window === 'undefined') return 'dashboard';
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('explore-map')) return 'explore-map';
    if (hash.includes('report-issue')) return 'report-issue';
    if (hash.includes('my-reports')) return 'my-reports';
    if (hash.includes('issue-detail')) return 'issue-detail';
    if (hash.includes('how-it-works')) return 'how-it-works';
    return 'dashboard';
  };

  // Portal State: 'gateway' | 'citizen' | 'admin'
  const [portal, setPortal] = useState(getInitialPortalFromURL);

  // Admin Subview: 'overview' | 'dispatch' | 'map' | 'roster' | 'settings' | 'issue-detail'
  const [adminView, setAdminView] = useState('overview');

  // Citizen Subview: 'dashboard' | 'explore-map' | 'report-issue' | 'my-reports' | 'issue-detail' | 'how-it-works'
  const [currentView, setCurrentView] = useState(getInitialCitizenViewFromURL);

  // Firebase connection status
  const [isFirebaseLive, setIsFirebaseLive] = useState(false);

  // Admin Authentication State
  const [adminAuth, setAdminAuth] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_AUTH);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.isAuthenticated && parsed?.adminUser) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return {
      isAuthenticated: false,
      adminUser: null,
    };
  });

  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_ROLE) || 'citizen';
  });

  // Data State
  const [issues, setIssues] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ISSUES);
      const parsed = saved ? JSON.parse(saved) : INITIAL_ISSUES;
      return [...parsed].sort((a, b) => {
        const timeA = new Date(a.reportedAt || a.createdAt || 0).getTime();
        const timeB = new Date(b.reportedAt || b.createdAt || 0).getTime();
        return timeB - timeA;
      });
    } catch {
      return [...INITIAL_ISSUES].sort((a, b) => {
        const timeA = new Date(a.reportedAt || a.createdAt || 0).getTime();
        const timeB = new Date(b.reportedAt || b.createdAt || 0).getTime();
        return timeB - timeA;
      });
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Selected Detail & Map Pin State
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [userLocation, setUserLocation] = useState('Baneshwor, Kathmandu');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // User Liked / Supported Issue IDs (Strict 1 like per citizen)
  const [likedIssueIds, setLikedIssueIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LIKED_ISSUES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync with Firebase Firestore real-time listener
  useEffect(() => {
    // Attempt seeding default issues if Firestore is fresh
    seedInitialIssuesIfEmpty(INITIAL_ISSUES);

    const unsubscribeIssues = subscribeToIssues(
      (firestoreIssues) => {
        if (firestoreIssues && firestoreIssues.length > 0) {
          const sorted = [...firestoreIssues].sort((a, b) => {
            const timeA = new Date(a.reportedAt || a.createdAt || 0).getTime();
            const timeB = new Date(b.reportedAt || b.createdAt || 0).getTime();
            return timeB - timeA;
          });
          setIssues(sorted);
          setIsFirebaseLive(true);
        }
      },
      (err) => {
        console.warn('Firestore subscription fallback to local state:', err);
      }
    );

    const unsubscribeNotifs = subscribeToNotifications(
      (firestoreNotifs) => {
        if (firestoreNotifs && firestoreNotifs.length > 0) {
          setNotifications(firestoreNotifs);
        }
      },
      (err) => {
        console.warn('Firestore notifs fallback:', err);
      }
    );

    return () => {
      unsubscribeIssues();
      unsubscribeNotifs();
    };
  }, []);

  // Sync Data to LocalStorage as resilient backup
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ISSUES, JSON.stringify(issues));
    } catch (e) {
      console.error('Failed to sync issues:', e);
    }
  }, [issues]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to sync notifications:', e);
    }
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, JSON.stringify(adminAuth));
    } catch (e) {
      console.error('Failed to sync admin auth:', e);
    }
  }, [adminAuth]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LIKED_ISSUES, JSON.stringify(likedIssueIds));
    } catch (e) {
      console.error('Failed to sync liked issues:', e);
    }
  }, [likedIssueIds]);

  // URL Hash Synchronizer
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#/admin') || hash.startsWith('#admin')) {
        setPortal('admin');
        const parts = hash.split('/');
        if (parts[2] && ['overview', 'dispatch', 'map', 'roster', 'settings', 'issue-detail'].includes(parts[2])) {
          setAdminView(parts[2]);
        }
      } else if (hash === '#/gateway' || hash === '#gateway') {
        setPortal('gateway');
      } else if (
        hash.startsWith('#/explore-map') ||
        hash.startsWith('#/report-issue') ||
        hash.startsWith('#/my-reports') ||
        hash.startsWith('#/issue-detail') ||
        hash.startsWith('#/how-it-works') ||
        hash.startsWith('#/dashboard') ||
        hash.startsWith('#/citizen')
      ) {
        setPortal('citizen');
        if (hash.includes('explore-map')) setCurrentView('explore-map');
        else if (hash.includes('report-issue')) setCurrentView('report-issue');
        else if (hash.includes('my-reports')) setCurrentView('my-reports');
        else if (hash.includes('issue-detail')) setCurrentView('issue-detail');
        else if (hash.includes('how-it-works')) setCurrentView('how-it-works');
        else setCurrentView('dashboard');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Synchronize hash when portal or views change
  useEffect(() => {
    if (portal === 'citizen') {
      const target = `#/${currentView}`;
      if (window.location.hash !== target) {
        window.location.hash = target;
      }
    } else if (portal === 'admin') {
      const target = `#/admin/${adminView}`;
      if (window.location.hash !== target) {
        window.location.hash = target;
      }
    }
  }, [portal, currentView, adminView]);

  // Update window hash when portal / views change cleanly
  const navigateToGateway = useCallback(() => {
    setPortal('gateway');
    try {
      localStorage.setItem(STORAGE_KEY_PORTAL, 'gateway');
    } catch {
      // ignore
    }
    window.location.hash = '#/gateway';
  }, []);

  const navigateToAdmin = useCallback((subview = 'overview') => {
    setPortal('admin');
    setAdminView(subview);
    try {
      localStorage.setItem(STORAGE_KEY_PORTAL, 'admin');
    } catch {
      // ignore
    }
    window.location.hash = `#/admin/${subview}`;
  }, []);

  const loginCitizen = useCallback((subview = 'dashboard') => {
    setPortal('citizen');
    setCurrentRole('citizen');
    setCurrentView(subview);
    try {
      localStorage.setItem(STORAGE_KEY_PORTAL, 'citizen');
      localStorage.setItem(STORAGE_KEY_ROLE, 'citizen');
    } catch {
      // ignore
    }
    window.location.hash = `#/${subview}`;
  }, []);

  const navigateToCitizen = loginCitizen;

  // Admin / Officer Authentication Actions
  const loginAdmin = (email, password) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    // 1. Check known admin accounts
    let matchedAccount = ADMIN_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === normalizedEmail && acc.password === cleanPassword
    );

    // 2. Check if matches any INITIAL_RESPONDERS email or generic officer login
    if (!matchedAccount) {
      const matchedResponder = INITIAL_RESPONDERS.find(
        (r) =>
          (r.id && normalizedEmail.includes(r.id.toLowerCase())) ||
          (r.name && normalizedEmail.includes(r.name.toLowerCase().split(' ')[0])) ||
          (r.department && normalizedEmail.includes(r.category))
      );

      if (matchedResponder && (cleanPassword === 'nepal2025' || cleanPassword === 'officer123' || cleanPassword.length >= 4)) {
        matchedAccount = {
          email: normalizedEmail,
          name: matchedResponder.name,
          role: matchedResponder.role || 'Officer',
          department: matchedResponder.department,
          badgeNumber: `KMC-${matchedResponder.category.toUpperCase()}-09`,
          avatar: matchedResponder.avatar,
        };
      }
    }

    // 3. Fallback permissive officer login for testing any valid gov email
    if (!matchedAccount && normalizedEmail.includes('@') && cleanPassword.length >= 4) {
      if (cleanPassword === 'nepal2025' || cleanPassword === 'officer123' || cleanPassword === 'admin123' || cleanPassword === 'waste2025' || cleanPassword === 'roads123') {
        matchedAccount = {
          email: normalizedEmail,
          name: normalizedEmail.split('@')[0].replace('.', ' ').toUpperCase(),
          role: 'Municipal Officer',
          department: 'Kathmandu Metropolitan Authority',
          badgeNumber: 'KMC-OFF-771',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        };
      }
    }

    if (matchedAccount) {
      const authData = {
        isAuthenticated: true,
        adminUser: {
          email: matchedAccount.email,
          name: matchedAccount.name,
          role: matchedAccount.role,
          department: matchedAccount.department,
          badgeNumber: matchedAccount.badgeNumber,
          avatar: matchedAccount.avatar,
          token: `KMC-AUTH-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          loginTime: new Date().toISOString(),
        },
      };
      setAdminAuth(authData);
      setCurrentRole('admin');
      setPortal('admin');
      setAdminView('overview');
      try {
        localStorage.setItem(STORAGE_KEY_PORTAL, 'admin');
        localStorage.setItem(STORAGE_KEY_ROLE, 'admin');
      } catch {
        // ignore
      }
      window.location.hash = '#/admin/overview';
      return { success: true };
    } else {
      return {
        success: false,
        message: 'Invalid official credentials. Use demo officer email & password provided.',
      };
    }
  };

  const logoutAdmin = useCallback(() => {
    setAdminAuth({
      isAuthenticated: false,
      adminUser: null,
    });
    setPortal('gateway');
    try {
      localStorage.setItem(STORAGE_KEY_PORTAL, 'gateway');
      localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
      localStorage.removeItem(STORAGE_KEY_ROLE);
    } catch {
      // ignore
    }
    window.location.hash = '#/gateway';
  }, []);

  const logoutCitizen = useCallback(() => {
    setPortal('gateway');
    try {
      localStorage.setItem(STORAGE_KEY_PORTAL, 'gateway');
      localStorage.removeItem(STORAGE_KEY_ROLE);
    } catch {
      // ignore
    }
    window.location.hash = '#/gateway';
  }, []);

  // Derived mapped issues with user's permanent like status
  const mappedIssues = useMemo(() => {
    const likedSet = new Set(likedIssueIds);
    return issues.map((issue) => ({
      ...issue,
      upvotes: Math.max(0, Number(issue.upvotes) || 0),
      hasUpvoted: likedSet.has(issue.id),
    }));
  }, [issues, likedIssueIds]);

  // Derived selected issue
  const selectedIssue = useMemo(() => {
    return mappedIssues.find((issue) => issue.id === selectedIssueId) || null;
  }, [mappedIssues, selectedIssueId]);

  // Global Statistics
  const stats = {
    total: issues.length,
    pending: issues.filter(
      (i) => i.status === 'pending' || i.status === 'under_review'
    ).length,
    inProgress: issues.filter(
      (i) => i.status === 'in_progress' || i.status === 'assigned'
    ).length,
    resolved: issues.filter((i) => i.status === 'resolved').length,
    criticalAlerts: issues.filter(
      (i) => i.severity === 'critical' && i.status !== 'resolved'
    ).length,
    resolutionRate:
      issues.length > 0
        ? Math.round(
            (issues.filter((i) => i.status === 'resolved').length /
              issues.length) *
              100
          )
        : 0,
  };

  // Actions
  const addNewIssue = async (issueInput) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingPrefix =
      issueInput.municipality && issueInput.municipality.includes('Lalitpur') ? 'LMC' : 'KMC';
    const trackingNumber = `${trackingPrefix}-2025-${randomSuffix}`;

    // Upload / process images in parallel with safe fast timeout
    let processedImages = [];
    if (issueInput.images && issueInput.images.length > 0) {
      try {
        const uploadPromises = issueInput.images.map((img) =>
          uploadImageToStorage(img, 'grievance_proofs')
        );
        const results = await Promise.allSettled(uploadPromises);
        processedImages = results.map((res, idx) =>
          res.status === 'fulfilled' && res.value ? res.value : issueInput.images[idx]
        );
      } catch {
        processedImages = issueInput.images;
      }
    } else {
      processedImages = [
        'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
      ];
    }

    const newIssueId = generateNextIssueId(issues);

    const newIssue = {
      id: newIssueId,
      trackingNumber,
      title: issueInput.title,
      description: issueInput.description,
      category: issueInput.category,
      severity: issueInput.severity,
      status: 'pending',
      coordinates: issueInput.coordinates,
      locationName: issueInput.locationName,
      ward: issueInput.ward,
      municipality: issueInput.municipality,
      reportedAt: new Date().toISOString(),
      reporterName: issueInput.reporterName || 'Citizen User',
      reporterPhone: issueInput.reporterPhone || '+977 9841234567',
      images: processedImages,
      upvotes: 1,
      impactScore:
        issueInput.severity === 'critical'
          ? 88
          : issueInput.severity === 'high'
          ? 72
          : issueInput.severity === 'medium'
          ? 54
          : 30,
      distanceKm: '0.6',
      timeline: [
        {
          step: 1,
          label: 'Report Submitted',
          status: 'pending',
          timestamp: 'Just now',
          isCompleted: true,
          isCurrent: true,
          notes: 'Received via Sajilo Nepal Citizen Portal with GPS validation.',
        },
        {
          step: 2,
          label: 'Ward Desk Review',
          status: 'under_review',
          isCompleted: false,
        },
        {
          step: 3,
          label: 'Dispatched to Officer',
          status: 'assigned',
          isCompleted: false,
        },
        {
          step: 4,
          label: 'Field Resolution',
          status: 'in_progress',
          isCompleted: false,
        },
        {
          step: 5,
          label: 'Resolution Verified',
          status: 'resolved',
          isCompleted: false,
        },
      ],
      activityLogs: [
        {
          id: `log-${Date.now()}`,
          title: 'Ticket Created',
          timestamp: 'Just now',
          author: issueInput.reporterName || 'Citizen',
          details: 'Reported with attached photographic proof and coordinates.',
        },
      ],
    };

    // Optimistically update local state immediately
    setIssues((prev) => [newIssue, ...prev]);
    setLikedIssueIds((prev) => (prev.includes(newIssueId) ? prev : [...prev, newIssueId]));

    // Persist to Cloud Firestore
    saveIssueToFirestore(newIssue);

    // Create confirmation notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Ticket Submitted Successfully',
      message: `Your report #${trackingNumber} (${newIssue.title}) has been registered with ${newIssue.municipality}.`,
      timestamp: 'Just now',
      isRead: false,
      type: 'status_change',
      relatedIssueId: newIssue.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    saveNotificationToFirestore(newNotif);

    return newIssue;
  };

  const updateIssueStatus = async (
    issueId,
    newStatus,
    note,
    resolutionPhoto
  ) => {
    let storedResolutionPhoto = resolutionPhoto;
    if (resolutionPhoto && resolutionPhoto.startsWith('data:')) {
      storedResolutionPhoto = await uploadImageToStorage(resolutionPhoto, 'resolution_proofs');
    }

    const currentIssue = issues.find((i) => i.id === issueId);
    if (!currentIssue) return;

    const updatedTimeline = currentIssue.timeline.map((step) => {
      if (newStatus === 'under_review' && step.step <= 2) {
        return {
          ...step,
          isCompleted: true,
          isCurrent: step.step === 2,
          timestamp: step.timestamp || 'Just now',
          notes: note || step.notes,
        };
      }
      if (newStatus === 'assigned' && step.step <= 3) {
        return {
          ...step,
          isCompleted: true,
          isCurrent: step.step === 3,
          timestamp: step.timestamp || 'Just now',
          notes: note || step.notes,
        };
      }
      if (newStatus === 'in_progress' && step.step <= 4) {
        return {
          ...step,
          isCompleted: true,
          isCurrent: step.step === 4,
          timestamp: step.timestamp || 'Just now',
          notes: note || step.notes,
        };
      }
      if (newStatus === 'resolved') {
        return {
          ...step,
          isCompleted: true,
          isCurrent: step.step === 5,
          timestamp: step.timestamp || 'Just now',
          notes: note || step.notes,
        };
      }
      return step;
    });

    const newLog = {
      id: `log-${Date.now()}`,
      title: `Status Changed to ${newStatus.replace('_', ' ').toUpperCase()}`,
      timestamp: 'Just now',
      author: adminAuth?.adminUser?.name || 'Municipal Officer',
      details: note || `Ticket updated to ${newStatus}.`,
    };

    const updatedIssue = {
      ...currentIssue,
      status: newStatus,
      resolutionNotes:
        newStatus === 'resolved' ? note || currentIssue.resolutionNotes : currentIssue.resolutionNotes,
      resolutionPhoto: storedResolutionPhoto || currentIssue.resolutionPhoto,
      timeline: updatedTimeline,
      activityLogs: [newLog, ...currentIssue.activityLogs],
    };

    // Update local state
    setIssues((prev) => prev.map((i) => (i.id === issueId ? updatedIssue : i)));

    // Persist update in Firestore
    updateIssueInFirestore(issueId, {
      status: newStatus,
      resolutionNotes: updatedIssue.resolutionNotes,
      resolutionPhoto: updatedIssue.resolutionPhoto,
      timeline: updatedTimeline,
      activityLogs: updatedIssue.activityLogs,
    });

    // Notify citizen
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: `Status Update: ${currentIssue.trackingNumber}`,
      message: `Ticket "${currentIssue.title}" status changed to ${newStatus
        .replace('_', ' ')
        .toUpperCase()}. ${note || ''}`,
      timestamp: 'Just now',
      isRead: false,
      type: newStatus === 'resolved' ? 'resolution' : 'status_change',
      relatedIssueId: issueId,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    saveNotificationToFirestore(newNotif);
  };

  const assignResponder = (issueId, responderId) => {
    const currentIssue = issues.find((i) => i.id === issueId);
    if (!currentIssue) return;

    let responder = null;
    if (responderId && responderId !== 'auto') {
      responder = INITIAL_RESPONDERS.find((r) => r.id === responderId);
    }
    if (!responder) {
      responder =
        INITIAL_RESPONDERS.find((r) => r.category === currentIssue.category) ||
        INITIAL_RESPONDERS[0];
    }

    const newLogs = [
      {
        id: `log-${Date.now()}`,
        title: `Assigned to ${responder.name}`,
        timestamp: 'Just now',
        author: adminAuth?.adminUser?.name || 'Ward Command',
        details: `Assigned to Officer ${responder.name} (${responder.department}).`,
      },
      ...currentIssue.activityLogs,
    ];

    const updatedTimeline = currentIssue.timeline ? currentIssue.timeline.map((step) => {
      if (step.status === 'assigned') {
        return {
          ...step,
          isCompleted: true,
          isCurrent: true,
          notes: `Dispatched to ${responder.name} (${responder.department}).`,
        };
      }
      return step;
    }) : undefined;

    setIssues((prev) =>
      prev.map((issue) => {
        if (issue.id !== issueId) return issue;
        return {
          ...issue,
          status: 'assigned',
          assignedResponder: responder,
          activityLogs: newLogs,
          ...(updatedTimeline ? { timeline: updatedTimeline } : {}),
        };
      })
    );

    updateIssueInFirestore(issueId, {
      status: 'assigned',
      assignedResponder: responder,
      activityLogs: newLogs,
      ...(updatedTimeline ? { timeline: updatedTimeline } : {}),
    });
  };

  const upvoteIssue = useCallback((issueId) => {
    const isCurrentlyLiked = likedIssueIds.includes(issueId);
    const willBeLiked = !isCurrentlyLiked;

    // Update liked issue IDs in state & localStorage
    setLikedIssueIds((prev) => {
      if (willBeLiked) {
        return prev.includes(issueId) ? prev : [...prev, issueId];
      } else {
        return prev.filter((id) => id !== issueId);
      }
    });

    const target = issues.find((i) => i.id === issueId);
    if (!target) return;

    const currentVotes =
      typeof target.upvotes === 'number' && !isNaN(target.upvotes)
        ? Math.max(0, target.upvotes)
        : 0;
    const newUpvotes = willBeLiked ? currentVotes + 1 : Math.max(0, currentVotes - 1);
    const currentImpact =
      typeof target.impactScore === 'number' && !isNaN(target.impactScore)
        ? Math.max(0, target.impactScore)
        : 50;
    const newImpact = Math.max(0, Math.min(100, currentImpact + (willBeLiked ? 2 : -2)));

    // Optimistically update issues state locally
    setIssues((prev) =>
      prev.map((issue) => {
        if (issue.id !== issueId) return issue;
        return {
          ...issue,
          upvotes: newUpvotes,
          impactScore: newImpact,
        };
      })
    );

    // Sync numeric vote count and impact score to Cloud Firestore
    updateIssueInFirestore(issueId, {
      upvotes: newUpvotes,
      impactScore: newImpact,
    });
  }, [likedIssueIds, issues]);

  const markNotificationRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, isRead: true } : n))
    );
    updateNotificationInFirestore(notifId, { isRead: true });
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const openIssueDetail = (issueId) => {
    setSelectedIssueId(issueId);
    if (portal === 'admin') {
      setAdminView('issue-detail');
    } else {
      setCurrentView('issue-detail');
    }
  };

  return (
    <AppContext.Provider
      value={{
        portal,
        setPortal,
        adminView,
        setAdminView,
        adminAuth,
        adminUser: adminAuth?.adminUser,
        loginAdmin,
        loginCitizen,
        logoutAdmin,
        logoutCitizen,
        navigateToGateway,
        navigateToAdmin,
        navigateToCitizen,
        currentView,
        setCurrentView,
        currentRole,
        setCurrentRole,
        issues: mappedIssues,
        notifications,
        selectedIssueId,
        setSelectedIssueId,
        selectedIssue,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        userLocation,
        setUserLocation,
        isNotificationOpen,
        setIsNotificationOpen,
        stats,
        isFirebaseLive,
        addNewIssue,
        updateIssueStatus,
        assignResponder,
        upvoteIssue,
        markNotificationRead,
        markAllNotificationsRead,
        openIssueDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
