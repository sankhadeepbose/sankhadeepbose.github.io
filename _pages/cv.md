---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* Ph.D in Mechanical Engineering (Research Area - Thermodynamics), Vellore Institute of Technology, Vellore, India, 2024 (expected)
* M.Tech. in Nanotechnology, Vellore Institute of Technology, Vellore, India, 2020
* B.Tech. in Mechanical Engineering, Maulana Abul Kalam Azad University of Technology, Kolkata, India, 2017

Research experience
======
* 12/2019 – Ongoing: Investigator & Principal User
  * UK HEC Materials Chemistry Consortium
  * Regularly submitted and received awards for HPC resources (ARCHER/ARCHER2) to support a series of research projects, on a six-month basis since 2019.
  * Description of project: This project extends our ongoing research on enhancing the thermal properties of known materials containing nanoparticles.

* 12/2019 – 05/2020: Research Student
  * Group of Prof. Bruno D’Aguanno, Centre for Nanotechnology Research, Vellore Institute of Technology, Vellore, India
  * Description of project: Improving Thermal Properties of Molten Salts and Functionalized Carbon-based Foams
  * Using all-atoms simulations (Molecular Dynamics), I studied the structural and thermal properties with a focus on specific heat, correlating it's increases in the solid phase to interface density.
  
Skills
======
* Computational Techniques:
  * Molecular dynamics
  * Car–Parrinello molecular dynamics
  * Density functional theory
  * Free energy perturbation
* Programming Language:
  * Fortran (90/95/2008)
  * R
  * Bash
  * MATLAB
* Technical Softwares:
  * LAMMPS
  * Quantum ESPRESSO
  * VMD
  * PLUMED
* OS and Environments:
  * Unix/Linux
  * HPC environments (ARCHER, ARCHER2, YOUNG)

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
