const API_BASE_URL = 'http://localhost:3000/api';

export const submitCase = async (caseData: any, signatures: string[]) => {
  const response = await fetch(`${API_BASE_URL}/cases`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ caseData, signatures }),
  });
  return response.json();
};

export const requestAgeProgression = async (caseId: string) => {
  const response = await fetch(`${API_BASE_URL}/forensic/age-progression`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ caseId }),
  });
  return response.json();
};

export const generateFOIA = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/legal/foia`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};
