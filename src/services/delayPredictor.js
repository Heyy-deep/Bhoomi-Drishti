/**
 * ML Delay Predictor Service for Land Acquisition Tracking (LightGBM/XGBoost simulation)
 * Evaluates land acquisition parameters and returns risk scores, delay probabilities, and root cause analysis.
 */

export function calculateParcelRisk(parcel) {
  let score = 20; // baseline

  // 1. SLA Breach / Days in stage weight
  if (parcel.daysInStage > parcel.slaDeadlineDays) {
    const overdueRatio = (parcel.daysInStage - parcel.slaDeadlineDays) / parcel.slaDeadlineDays;
    score += Math.min(45, Math.round(overdueRatio * 40 + 20));
  } else if (parcel.daysInStage > parcel.slaDeadlineDays * 0.8) {
    score += 15;
  }

  // 2. Document completeness weight
  const docs = parcel.documents || {};
  let missingDocsCount = 0;
  Object.values(docs).forEach(status => {
    if (status === 'REJECTED') {
      score += 20;
      missingDocsCount++;
    } else if (status === 'PENDING' || status === 'IN_PROGRESS') {
      score += 8;
      missingDocsCount++;
    }
  });

  // 3. Land type complexity
  if (parcel.landType?.includes('Commercial') || parcel.landType?.includes('Residential')) {
    score += 12;
  } else if (parcel.landType?.includes('Irrigated')) {
    score += 8;
  }

  // 4. Known risk factors
  if (parcel.riskFactors && parcel.riskFactors.length > 0) {
    score += parcel.riskFactors.length * 10;
  }

  // Cap score between 5 and 98
  const finalScore = Math.max(5, Math.min(98, score));
  let level = 'LOW';
  if (finalScore >= 70) level = 'CRITICAL';
  else if (finalScore >= 40) level = 'MEDIUM';

  // Predict estimated delay in days
  const predictedDelayDays = Math.round((finalScore / 100) * 90);

  // Recommendations generator
  const recommendations = [];
  if (parcel.slaStatus === 'BREACHED') {
    recommendations.push("Auto-issue SLA Breach Notice to Revenue SLAO");
  }
  if (docs.encumbranceCert !== 'VERIFIED') {
    recommendations.push("Initiate Instant e-Verification with Sub-Registrar Office (SRO)");
  }
  if (parcel.riskFactors?.some(r => r.toLowerCase().includes('court') || r.toLowerCase().includes('dispute'))) {
    recommendations.push("Deploy Revenue Legal Cell fast-track dispute resolution team");
  }
  if (recommendations.length === 0) {
    recommendations.push("Parcel on track — Proceed to next milestone declaration");
  }

  return {
    riskScore: finalScore,
    riskLevel: level,
    predictedDelayDays,
    recommendations
  };
}

export function getSystemWideMetrics(parcels) {
  const total = parcels.length;
  const criticalCount = parcels.filter(p => p.riskLevel === 'CRITICAL' || p.riskScore >= 70).length;
  const breachedCount = parcels.filter(p => p.slaStatus === 'BREACHED').length;
  const totalCompensation = parcels.reduce((sum, p) => sum + p.compensationTotal, 0);
  const totalDisbursed = parcels.reduce((sum, p) => sum + p.disbursedAmount, 0);
  
  const avgDaysInStage = Math.round(
    parcels.reduce((sum, p) => sum + p.daysInStage, 0) / (total || 1)
  );

  return {
    total,
    criticalCount,
    breachedCount,
    totalCompensation,
    totalDisbursed,
    disbursementRate: Math.round((totalDisbursed / (totalCompensation || 1)) * 100),
    avgDaysInStage
  };
}
