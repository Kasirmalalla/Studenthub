# Major Match Test Research Basis

This feature is a guidance tool for academic exploration, not a clinical, mental-health, or ability diagnosis.

The first version uses transparent rules-based matching because Student Hub needs explanations that students and advisors can understand. The model is based on:

- RIASEC / Holland-style vocational interest matching: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional interest areas.
- O*NET Interest Profiler-style career-interest guidance. O*NET describes the Interest Profiler as a family of self-assessment tools that helps users identify broad interest areas and explore work activities and occupations they may like.
- O*NET Interest Profiler psychometric documentation. The short-form summary reports development work around brief RIASEC scales and notes acceptable reliability plus convergent and discriminant validity in initial research.
- A lightweight work-preference layer inspired by career values and work environment fit. Student Hub currently uses practical/theoretical, people/systems, structured/flexible, creative/analytical, and leadership/support signals rather than making personality-type claims.

Implementation notes:

- Student answers are scored across RIASEC dimensions and preference dimensions.
- Each major has an explicit profile of interest and preference weights.
- Recommendations are ranked by fit score and include interpretable explanations.
- Results should be treated as a starting point for exploration, curriculum comparison, advising, and reflection.
- MBTI-style type logic is intentionally not used as the primary engine.

Source references:

- O*NET Interest Profiler: https://www.onetcenter.org/IP.html
- O*NET Interest Profiler Manual: https://www.onetcenter.org/dl_files/IP_Manual.pdf
- O*NET Interest Profiler Short Form Psychometric Characteristics: https://www.onetcenter.org/reports/IPSF_Psychometric.html
- O*NET Work Importance Locator archived work-values materials: https://www.onetcenter.org/reports/WIL_Archive.html
- U.S. Department of Labor O*NET overview and career exploration tools: https://www.dol.gov/agencies/eta/onet
- NCDA Career Convergence article mentioning Holland RIASEC fit with interests, skills, values, and possible college majors: https://www.ncda.org/aws/NCDA/pt/sd/news_article/118635/_PARENT/CC_layout_details/false