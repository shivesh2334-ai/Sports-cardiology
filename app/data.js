// Source: 2020 ESC Guidelines on sports cardiology and exercise in patients with CVD (Eur Heart J 2021;42:17-96).
// Class/Level values and thresholds are transcribed from the guideline recommendation tables. Ref numbers = guideline reference list.
export const LOE = {
  A: 'Data from multiple randomized clinical trials or meta-analyses.',
  B: 'Data from a single randomized trial or large non-randomized studies.',
  C: 'Consensus of expert opinion and/or small studies, retrospective studies, registries.'
};
export const CLS = {
  I: 'Recommended / indicated', IIa: 'Should be considered', IIb: 'May be considered', III: 'Not recommended'
};
const ck = (id, label) => ({ id, label, type: 'check' });
const num = (id, label) => ({ id, label, type: 'number' });
const R = (cls, lvl, text, sec, refs, extra = {}) => ({ cls, lvl, text, sec, refs, ...extra });

export const CONDITIONS = [
{
 id: 'healthy', name: 'Healthy adult / pre-participation (age >35)', section: '4.2',
 inputs: [num('age', 'Age (years)'), ck('comp', 'Competitive athlete'), ck('sed', 'Sedentary and planning intensive exercise'), ck('hirisk', 'High / very high CV risk (e.g. SCORE >10%, strong family history, familial hypercholesterolaemia)'), ck('hiint', 'Intends high- or very high-intensity exercise'), ck('sbp', 'Uncontrolled hypertension (SBP >160 mmHg)'), ck('obese', 'Obesity (BMI ≥30 or high waist circumference)')],
 stratify: a => (a.sbp ? ['high', 'Uncontrolled hypertension', 'Defer high-intensity exercise until BP is controlled.'] : (a.hirisk && a.hiint) || (a.sed && a.hiint) ? ['mid', 'Intermediate – evaluation advised', 'High CV risk or sedentary status with intent of intensive exercise warrants clinical evaluation first.'] : ['low', 'Low–moderate CV risk', 'Recreational sport may proceed without further CV evaluation.']),
 recs: [
  R('I','A','At least 150 min/week moderate or 75 min/week vigorous aerobic exercise (or equivalent) is recommended in all healthy adults.','4.1 (Table 5)','113–118'),
  R('I','A','Gradual increase to 300 min/week moderate or 150 min/week vigorous exercise is recommended for additional benefit.','Table 5','114, 116'),
  R('I','B','Regular assessment and counselling to promote adherence is recommended.','Table 5','119'),
  R('I','B','Spread sessions across 4–5 days/week, preferably daily.','Table 5','113, 114'),
  R('I','A','Obesity: resistance training ≥3×/week plus moderate/vigorous aerobic exercise (≥30 min, 5–7 d/wk) to reduce CVD risk.','4.2 (Section 9 summary)',null,{when:a=>a.obese}),
  R('III','C','Uncontrolled hypertension (SBP >160 mmHg): high-intensity exercise is not recommended until BP is controlled.','4.2 (Section 9 summary)',null,{when:a=>a.sbp}),
  R('IIa','C','Low–moderate CV risk: participation in all recreational sports should be considered without further CV evaluation.','4.1 (>35 y table)',null,{when:(a,t)=>t==='low'}),
  R('IIa','C','Competitive athletes: screening with family history, symptoms, examination and 12-lead resting ECG should be considered.','4.1 (>35 y table)',null,{when:a=>a.comp}),
  R('IIa','C','Sedentary or high/very high-risk individuals planning intensive exercise: clinical evaluation including maximal exercise testing should be considered for prognosis.','4.1 (>35 y table)',null,{when:a=>a.sed||a.hirisk}),
  R('IIb','B','Very high risk without known CAD (e.g. SCORE >10%, FH) wanting high-intensity exercise: functional imaging, CCTA or carotid/femoral ultrasound may be considered.','4.1 (>35 y table)',null,{when:a=>a.hirisk&&a.hiint})
 ],
 tests: [['Resting 12-lead ECG','Detects cardiomyopathy, channelopathy, pre-excitation and conduction disease; core of athlete screening.'],['Maximal exercise test','Assesses functional capacity, exercise-induced ischaemia, arrhythmia and BP response; guides intensity prescription.'],['Coronary CCTA / functional imaging','Identifies subclinical atherosclerosis in very high-risk people before intensive training.'],['SCORE risk estimate, lipids, BP, glucose','Defines baseline CV risk category that determines whether evaluation is needed.']]
},
{
 id: 'ccs', name: 'Coronary artery disease / chronic coronary syndrome / post-ACS', section: '5.1',
 inputs: [ck('ischaemia', 'Inducible ischaemia or residual ischaemia on exercise test/functional imaging'), ck('lvef', 'Impaired LV function (reduced LVEF)'), ck('va', 'Exercise-induced complex ventricular arrhythmia'), ck('resid', 'Incomplete revascularisation / residual significant stenosis'), ck('acs', 'Recent acute coronary syndrome (return to exercise)'), ck('comp', 'Wants competitive sport')],
 stratify: a => (a.ischaemia || a.lvef || a.va || a.resid) ? ['high', 'High risk of exercise-induced events', 'Competitive sport is not advised; leisure activity below ischaemic threshold only.'] : ['low', 'Low risk of exercise-induced events', 'No inducible ischaemia, preserved LV function and no complex arrhythmia.'],
 recs: [
  R('I','A','Exercise-based cardiac rehabilitation is recommended in all individuals with CAD to reduce cardiac mortality and rehospitalization.','5.1.4 (post-ACS table)','234'),
  R('IIa','B','After ACS, motivational/psychological support and individualized progression advice should be considered.','5.1.4 (post-ACS table)',null,{when:a=>a.acs}),
  R('IIa','C','Low-risk CCS: all sports, at individually adapted intensity, should be considered.','5.1.4 (post-ACS table)',null,{when:(a,t)=>t==='low'}),
  R('IIa','C','Asymptomatic CCS without inducible ischaemia: participation in all exercise types including competitive sport should be considered after individual assessment.','5.1.1','233',{when:(a,t)=>t==='low'}),
  R('IIb','C','High risk (e.g. persisting ischaemia): leisure-time exercise below the angina/ischaemic threshold may be considered.','5.1.2 (CCS table)','233',{when:(a,t)=>t==='high'}),
  R('III','C','Competitive sports are not recommended in high-risk individuals or with residual ischaemia (individually chosen skill sports excepted).','5.1.2 (CCS table)','233',{when:(a,t)=>t==='high'})
 ],
 tests: [['Maximal / symptom-limited exercise test with ECG','Detects inducible ischaemia and arrhythmia; required before return to sport.'],['Functional imaging (stress echo/CMR/SPECT/PET)','Defines ischaemic burden when ECG is uninterpretable or for risk stratification.'],['Echocardiography','LVEF is a key determinant of exercise-event risk (Table 10).'],['CPET','Gives aerobic/anaerobic thresholds to prescribe safe intensity.'],['Holter monitoring','Finds ventricular arrhythmia that would up-classify risk.']]
},
{
 id: 'hcm', name: 'Hypertrophic cardiomyopathy (HCM)', section: '5.4',
 inputs: [ck('sym', 'Cardiac symptoms, prior cardiac arrest or unexplained syncope'), ck('esc', 'ESC HCM risk score ≥4% at 5 years'), ck('lvot', 'Resting LVOT gradient >30 mmHg'), ck('bp', 'Abnormal BP response to exercise'), ck('arr', 'Exercise-induced arrhythmias'), ck('gpos', 'Gene-positive, phenotype-negative')],
 stratify: a => (a.sym||a.esc||a.lvot||a.bp||a.arr) ? ['high','Markers of increased risk present','Any one marker precludes high-intensity exercise.'] : a.gpos ? ['mid','Genotype-positive / phenotype-negative','Annual phenotypic assessment is needed.'] : ['low','No markers of increased risk','Eligible for expert-assessed high-intensity exercise.'],
 recs: [
  R('IIb','C','No markers of increased risk: high-intensity exercise/competitive sport may be considered after expert assessment (except sports where syncope could cause harm).','5.4 Cardiomyopathies (HCM table)',null,{when:(a,t)=>t!=='high'}),
  R('IIb','C','Any marker of increased risk: low- or moderate-intensity recreational exercise may be considered after expert assessment.','5.4 Cardiomyopathies (HCM table)',null,{when:(a,t)=>t==='high'}),
  R('IIb','C','Gene-positive/phenotype-negative: all competitive sports may be considered.','5.4 Cardiomyopathies (HCM table)',null,{when:a=>a.gpos}),
  R('III','C','High-intensity exercise (recreational or competitive) is not recommended with ANY marker of increased risk.','5.4 Cardiomyopathies (HCM table)',null,{when:(a,t)=>t==='high'}),
  R('I','C','Annual follow-up is recommended for individuals who exercise regularly.','5.4 Cardiomyopathies (HCM table)'),
  R('IIa','C','Six-monthly follow-up should be considered in adolescents and young adults.','5.4 Cardiomyopathies (HCM table)'),
  R('IIa','C','Annual assessment of genotype-positive/phenotype-negative individuals should be considered.','5.4 Cardiomyopathies (HCM table)',null,{when:a=>a.gpos})
 ],
 tests: [['ESC HCM-SCD 5-year risk calculator','Quantifies sudden-death risk (≥4% = moderate); central marker for restriction.'],['Echocardiography incl. LVOT gradient','Resting/provoked gradient >30 mmHg is a restriction marker.'],['Exercise test with BP monitoring','Detects abnormal BP response and exercise-induced arrhythmia.'],['Holter monitoring','Detects non-sustained VT.'],['Cardiac MRI','Defines hypertrophy extent and fibrosis (LGE).'],['Genetic testing / family screening','Identifies gene-positive, phenotype-negative carriers.']]
},
{
 id: 'acm', name: 'Arrhythmogenic cardiomyopathy (ACM)', section: '5.4',
 inputs: [ck('hx', 'History of cardiac arrest, ventricular arrhythmia or unexplained syncope'), ck('struct', 'More than minimal structural abnormality'), ck('pvc', '≥500 PVCs/24 h'), ck('exva', 'Exercise-induced complex ventricular arrhythmia'), ck('gpos', 'Gene-positive, phenotype-negative'), ck('hirg', 'High-risk genotype (DSP, TMEM43, multiple variants)')],
 stratify: a => (a.hx||a.struct||a.pvc||a.exva) ? ['high','High arrhythmic risk','Only low-intensity activity is supported.'] : ['mid','Limited-risk phenotype','Light–moderate recreational exercise only; no competitive/high-intensity sport.'],
 recs: [
  R('IIa','C','150 min/week of low-intensity exercise should be considered for all individuals.','5.4 Cardiomyopathies (ACM table)'),
  R('IIb','C','Low-to-moderate recreational exercise may be considered if no arrest/VA history, minimal structural change, <500 PVCs/24 h and no exercise-induced complex VA.','5.4 Cardiomyopathies (ACM table)',null,{when:(a,t)=>t==='mid'}),
  R('III','B','High-intensity recreational exercise or any competitive sport is not recommended in ACM, including gene-positive/phenotype-negative.','5.4 Cardiomyopathies (ACM table)','384, 386'),
  R('I','C','Annual follow-up is recommended for individuals who exercise regularly.','5.4 Cardiomyopathies (ACM table)'),
  R('IIa','C','Six-monthly follow-up should be considered in adolescents/young adults.','5.4 Cardiomyopathies (ACM table)'),
  R('IIa','C','Annual phenotype assessment of genotype-positive/phenotype-negative individuals.','5.4 Cardiomyopathies (ACM table)',null,{when:a=>a.gpos}),
  R('IIa','C','Six-monthly follow-up for high-arrhythmic-risk genotypes (DSP, TMEM43, multiple variants).','5.4 Cardiomyopathies (ACM table)',null,{when:a=>a.hirg})
 ],
 tests: [['12-lead ECG & signal-averaged ECG','Repolarisation/depolarisation abnormalities support diagnosis.'],['Holter (PVC burden)','<500 vs ≥500 PVCs/24 h separates tiers.'],['Exercise test','Reveals exercise-induced complex VA.'],['Cardiac MRI & echocardiography','Quantify RV/LV structural abnormality.'],['Genetic testing','Identifies high-risk genotypes.']]
},
{
 id: 'dcm', name: 'Dilated cardiomyopathy (DCM)', section: '5.4',
 inputs: [ck('sym', 'Symptoms, prior cardiac arrest or unexplained syncope'), ck('ef', 'LVEF <45%'), ck('va', 'Frequent/complex VA on Holter or exercise test'), ck('lge', 'Extensive LGE (>20%) on CMR'), ck('gen', 'High-risk genotype (lamin A/C, filamin C)'), ck('mild', 'LVEF 45–50% with no LGE and EF rise 10–15% on exercise')],
 stratify: a => (a.sym||a.ef||a.va||a.lge||a.gen) ? ['high','High-risk features','High/very-high-intensity exercise and competitive sport are not recommended.'] : ['mid','No high-risk features','Low–moderate intensity recreational exercise appropriate.'],
 recs: [
  R('IIa','C','Low-to-moderate recreational exercise should be considered in all DCM regardless of EF, absent limiting symptoms and exercise-induced VA.','5.4 Cardiomyopathies (DCM table)'),
  R('IIb','C','High/very-high-intensity exercise may be considered if asymptomatic with EF 45–50%, no frequent/complex VA, no LGE and EF increase 10–15% on exercise.','5.4 Cardiomyopathies (DCM table)',null,{when:(a,t)=>t!=='high'&&a.mild}),
  R('III','C','High/very-high-intensity exercise incl. competitive sport is not recommended with symptoms/arrest/syncope, LVEF <45%, frequent/complex VA, LGE >20% or high-risk genotype.','5.4 Cardiomyopathies (DCM table)',null,{when:(a,t)=>t==='high'})
 ],
 tests: [['Echocardiography','LVEF <45% is a restriction threshold.'],['Cardiac MRI','LGE >20% marks scar-related arrhythmic risk.'],['Holter and exercise test','Detects VA and exercise EF reserve.'],['Genetic testing','Lamin A/C and filamin C carry high arrhythmic risk.']]
},
{
 id: 'myo', name: 'Myocarditis / pericarditis', section: '5.5',
 inputs: [ck('active', 'Active inflammation (probable/definite recent myocarditis)'), ck('lt6', 'Less than 3–6 months since acute myocarditis'), ck('norm', 'Normal troponin & inflammatory markers'), ck('lvf', 'Normal LV function on echo and CMR'), ck('noLge', 'No ongoing inflammation/fibrosis on CMR'), ck('cap', 'Good functional capacity'), ck('noVa', 'No frequent/complex VA on Holter/exercise test'), ck('constr', 'Constrictive pericarditis')],
 stratify: a => (a.active||a.lt6||a.constr) ? ['high','Exercise restriction','Active inflammation or <3–6 months from myocarditis.'] : (a.norm&&a.lvf&&a.noLge&&a.cap&&a.noVa) ? ['low','Criteria for return met','All return-to-play criteria satisfied.'] : ['mid','Incomplete assessment','Complete evaluation before return to exercise.'],
 recs: [
  R('I','B','Comprehensive evaluation (imaging, exercise test, Holter) is recommended after recovery from acute myocarditis.','5.5 Myocarditis table','455, 462, 463'),
  R('IIa','C','Return to all exercise incl. competitive sport should be considered after 3–6 months if all criteria are met (normal biomarkers, LV function, no CMR inflammation/fibrosis, good capacity, no frequent/complex VA).','5.5 Myocarditis table','430, 434, 453, 459, 460, 464',{when:(a,t)=>t==='low'}),
  R('III','C','Leisure-time or competitive sport is not recommended while active inflammation is present.','5.5 Myocarditis table','459, 460',{when:a=>a.active}),
  R('III','B','Moderate–high intensity exercise for 3–6 months after acute myocarditis is not recommended.','5.5 Myocarditis table','459–461, 467',{when:a=>a.lt6||a.active}),
  R('III','C','Moderate–high intensity exercise is not recommended in constrictive pericarditis.','5.5 Pericarditis table',null,{when:a=>a.constr})
 ],
 tests: [['Troponin & CRP','Confirm resolution of myocardial injury/inflammation.'],['Echocardiography','Normal LV function required to resume sport.'],['Cardiac MRI (LGE/oedema)','Detects residual inflammation or scar.'],['Holter and exercise test','Exclude exercise-induced arrhythmia.']]
},
{
 id: 'af', name: 'Atrial fibrillation in exercising individuals', section: '5.6',
 inputs: [ck('shd', 'Structural heart disease or other primary cause (thyroid, alcohol/drugs) not yet evaluated'), ck('recur', 'Recurrent symptomatic AF or declines drug therapy'), ck('vig', 'Prolonged vigorous exercise (esp. middle-aged men)'), ck('flut', 'Documented atrial flutter wanting intensive exercise'), ck('anti', 'Anticoagulated')],
 stratify: a => a.shd ? ['mid','Evaluate cause first','Assess structural/thyroid/alcohol causes before sport.'] : a.recur ? ['mid','Symptomatic recurrent AF','Rhythm-control (ablation) discussion advised.'] : ['low','Stable','Exercise appropriate with rate surveillance.'],
 recs: [
  R('I','A','Regular physical activity is recommended to prevent AF.','5.6 (AF table)','297, 470–473'),
  R('I','A','Evaluate/manage structural heart disease, thyroid dysfunction, alcohol/drug abuse or other primary causes before sport.','5.6 (AF table)','485'),
  R('I','B','Counsel on effect of long-lasting intense sport on AF recurrence.','5.6 (AF table)','471, 475, 481, 490',{when:a=>a.vig}),
  R('I','B','AF ablation is recommended in exercising individuals with recurrent symptomatic AF or who decline drugs.','5.6 (AF table)','488, 489',{when:a=>a.recur}),
  R('IIa','C','Consider ventricular rate during exercise (symptoms/ECG monitoring) and titrate rate control.','5.6 (AF table)'),
  R('IIa','C','Cavo-tricuspid isthmus ablation should be considered in documented flutter wanting intensive exercise.','5.6 (AF table)',null,{when:a=>a.flut})
 ],
 tests: [['Echocardiography','Excludes structural heart disease.'],['TSH, alcohol/drug history','Reversible AF triggers.'],['Exercise test / ECG monitoring','Documents exercise ventricular rate for rate control titration.']]
},
{
 id: 'lqts', name: 'Long QT syndrome', section: '5.6',
 inputs: [num('qtc', 'QTc (ms)'), { id: 'sex', label: 'Sex', type: 'select', options: ['Male', 'Female'] }, ck('gen', 'Genetically confirmed LQTS'), ck('arrest', 'Prior cardiac arrest or arrhythmic syncope'), ck('sym', 'Prior symptoms or prolonged QTc (needs beta-blocker)')],
 stratify: a => { const q = +a.qtc || 0, t = a.sex === 'Female' ? 480 : 470; return a.arrest ? ['high','Prior arrest/arrhythmic syncope','Competitive sport not recommended (with or without ICD).'] : (q > 500 || (a.gen && q >= t)) ? ['high','High-risk QTc','High-intensity sport not recommended even on beta-blockers.'] : ['mid','Shared decision-making','Genotype-positive/phenotype-negative or lower-risk QTc.']; },
 recs: [
  R('I','B','Beta-blockers at target dose are recommended for exercising individuals with prior symptoms or prolonged QTc.','5.6 (LQTS table)','529',{when:a=>a.sym}),
  R('I','B','Avoid QT-prolonging drugs and electrolyte imbalance (hypokalaemia, hypomagnesaemia).','5.6 (LQTS table)','529'),
  R('IIa','C','Shared decision-making should be considered for genotype-positive/phenotype-negative LQTS (<470/480 ms men/women).','5.6 (LQTS table)',null,{when:(a,t)=>t==='mid'}),
  R('III','B','High-intensity recreational/competitive sport is not recommended with QTc >500 ms, or genetic LQTS with QTc ≥470 ms (men)/≥480 ms (women).','5.6 (LQTS table)',null,{when:(a,t)=>t==='high'&&!a.arrest}),
  R('III','C','Competitive sport (with or without ICD) is not recommended after cardiac arrest or arrhythmic syncope.','5.6 (LQTS table)',null,{when:a=>a.arrest})
 ],
 tests: [['Resting ECG – QTc measurement','Primary stratifier; thresholds 470/480/500 ms.'],['Exercise test / recovery ECG','Unmasks QT adaptation abnormalities.'],['Genetic testing','Confirms genotype for threshold selection.'],['Serum K⁺ / Mg²⁺','Hypokalaemia/hypomagnesaemia increase arrhythmic risk.']]
},
{
 id: 'brs', name: 'Brugada syndrome', section: '5.6',
 inputs: [ck('syn', 'Arrhythmic syncope and/or aborted SCD'), ck('icd', 'ICD implanted'), ck('icd3', 'No recurrent arrhythmia ≥3 months after ICD'), ck('carrier', 'Asymptomatic (carrier / inducible ECG pattern only)'), ck('heat', 'Sport with core temperature >39 °C or drugs aggravating BrS')],
 stratify: a => a.syn ? ['high','Symptomatic Brugada','ICD indicated; return to sport after shared decision-making.'] : ['mid','Asymptomatic','Sport allowed if core temperature stays <39 °C.'],
 recs: [
  R('I','C','ICD implantation is recommended with arrhythmic syncope and/or aborted SCD.','5.6.6 (Brugada table)','247',{when:a=>a.syn}),
  R('IIa','C','After ICD, resumption of sport should be considered after shared decision-making if no recurrence for 3 months.','5.6.6 (Brugada table)',null,{when:a=>a.icd}),
  R('IIb','C','Asymptomatic BrS/carriers: sport not raising core temperature >39 °C may be considered.','5.6.6 (Brugada table)',null,{when:a=>a.carrier||!a.syn}),
  R('III','C','Drugs aggravating BrS, electrolyte abnormalities and sports raising core temperature >39 °C are not recommended.','5.6.6 (Brugada table)',null)
 ],
 tests: [['Resting ECG (± drug challenge)','Identifies Type 1 pattern.'],['Syncope work-up','Arrhythmic syncope drives ICD decision.'],['Electrolytes; brugadadrugs.org check','Avoid aggravating drugs/imbalance.']]
}
];
