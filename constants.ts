
export const TOTAL_TIME_SECONDS = 180 * 60; // 3 hours
export const PAPER1_QUESTION_COUNT = 50;
export const PAPER2_QUESTION_COUNT = 100;
export const TOTAL_QUESTIONS = PAPER1_QUESTION_COUNT + PAPER2_QUESTION_COUNT;
export const MARKS_PER_QUESTION = 2;
export const UGC_NET_EXAM_STATE_KEY = 'ugcNetExamState';

export const SYLLABUS_PAPER_1 = `
Unit-I Teaching Aptitude
Teaching: Concept, Objectives, Levels of teaching (Memory, Understanding and Reflective), Characteristics and basic requirements.
Learner's characteristics: Characteristics of adolescent and adult learners (Academic, Social, Emotional and Cognitive), Individual differences.
Factors affecting teaching related to: Teacher, Learner, Support material, Instructional facilities, Learning environment and Institution.
Methods of teaching in Institutions of higher learning: Teacher centred vs. Learner centred methods; Off-line vs. On-line methods (Swayam, Swayamprabha, MOOCs etc.).
Teaching Support System: Traditional, Modern and ICT based.
Evaluation Systems: Elements and Types of evaluation, Evaluation in Choice Based Credit System in Higher education, Computer based testing, Innovations in evaluation systems.
Unit-II Research Aptitude
Research: Meaning, Types, and Characteristics, Positivism and Post-positivistic approach to research.
Methods of Research: Experimental, Descriptive, Historical, Qualitative and Quantitative methods.
Steps of Research.
Thesis and Article writing: Format and styles of referencing.
Application of ICT in research.
Research ethics.
Unit-III Comprehension
A passage of text be given. Questions be asked from the passage to be answered.
Unit-IV Communication
Communication: Meaning, types and characteristics of communication.
Effective communication: Verbal and Non-verbal, Inter-Cultural and group communications, Classroom communication.
Barriers to effective communication.
Mass-Media and Society.
Unit-V Mathematical Reasoning and Aptitude
Types of reasoning.
Number series, Letter series, Codes and Relationships.
Mathematical Aptitude (Fraction, Time & Distance, Ratio, Proportion and Percentage, Profit and Loss, Interest and Discounting, Averages etc.).
Unit-VI Logical Reasoning
Understanding the structure of arguments: argument forms, structure of categorical propositions, Mood and Figure, Formal and Informal fallacies, Uses of language, Connotations and denotations of terms, Classical square of opposition.
Evaluating and distinguishing deductive and inductive reasoning.
Analogies.
Venn diagram: Simple and multiple use for establishing validity of arguments.
Indian Logic: Means of knowledge.
Pramanas: Pratyaksha (Perception), Anumana (Inference), Upamana (Comparison), Shabda (Verbal testimony), Arthapatti (Implication) and Anupalabddhi (Non-apprehension).
Structure and kinds of Anumana (inference), Vyapti (invariable relation), Hetvabhasas (fallacies of inference).
Unit-VII Data Interpretation
Sources, acquisition and classification of Data.
Quantitative and Qualitative Data.
Graphical representation (Bar-chart, Histograms, Pie-chart, Table-chart and Line-chart) and mapping of Data.
Data Interpretation.
Data and Governance.
Unit-VIII Information and Communication Technology (ICT)
ICT: General abbreviations and terminology.
Basics of Internet, Intranet, E-mail, Audio and Video-conferencing.
Digital initiatives in higher education.
ICT and Governance.
Unit-IX People, Development and Environment
Development and environment: Millennium development and Sustainable development goals.
Human and environment interaction: Anthropogenic activities and their impacts on environment.
Environmental issues: Local, Regional and Global; Air pollution, Water pollution, Soil pollution, Noise pollution, Waste (solid, liquid, biomedical, hazardous, electronic), Climate change and its Socio-Economic and Political dimensions.
Impacts of pollutants on human health.
Natural and energy resources: Solar, Wind, Soil, Hydro, Geothermal, Biomass, Nuclear and Forests.
Natural hazards and disasters: Mitigation strategies.
Environmental Protection Act (1986), National Action Plan on Climate Change, International agreements/efforts -Montreal Protocol, Rio Summit, Convention on Biodiversity, Kyoto Protocol, Paris Agreement, International Solar Alliance.
Unit-X Higher Education System
Institutions of higher learning and education in ancient India.
Evolution of higher learning and research in Post Independence India.
Oriental, Conventional and Non-conventional learning programmes in India.
Professional, Technical and Skill Based education.
Value education and environmental education.
Policies, Governance, and Administration.
`;

export const SYLLABUS_PAPER_2 = `
Unit - 1: Discrete Structures and Optimization
Mathematical Logic: Propositional and Predicate Logic, Propositional Equivalences, Normal Forms, Predicates and Quantifiers, Nested Quantifiers, Rules of Inference.
Sets and Relations: Set Operations, Representation and Properties of Relations, Equivalence Relations, Partially Ordering.
Counting, Mathematical Induction and Discrete Probability: Basics of Counting, Pigeonhole Principle, Permutations and Combinations, Inclusion- Exclusion Principle, Mathematical Induction, Probability, Bayes' Theorem.
Group Theory: Groups, Subgroups, Semi Groups, Product and Quotients of Algebraic Structures, Isomorphism, Homomorphism, Automorphism, Rings, Integral Domains, Fields, Applications of Group Theory.
Graph Theory: Simple Graph, Multigraph, Weighted Graph, Paths and Circuits, Shortest Paths in Weighted Graphs, Eulerian Paths and Circuits, Hamiltonian Paths and Circuits, Planner graph, Graph Coloring, Bipartite Graphs, Trees and Rooted Trees, Prefix Codes, Tree Traversals, Spanning Trees and Cut-Sets.
Boolean Algebra: Boolean Functions and its Representation, Simplifications of Boolean Functions.
Optimization: Linear Programming - Mathematical Model, Graphical Solution, Simplex and Dual Simplex Method, Sensitive Analysis; Integer Programming, Transportation and Assignment Models, PERT-CPM: Diagram Representation, Critical Path Calculations, Resource Levelling, Cost Consideration in Project Scheduling.
Unit - 2: Computer System Architecture
Digital Logic Circuits and Components: Digital Computers, Logic Gates, Boolean Algebra, Map Simplifications, Combinational Circuits, Flip-Flops, Sequential Circuits, Integrated Circuits, Decoders, Multiplexers, Registers and Counters, Memory Unit.
Data Representation: Data Types, Number Systems and Conversion, Complements, Fixed Point Representation, Floating Point Representation, Error Detection Codes, Computer Arithmetic - Addition, Subtraction, Multiplication and Division Algorithms.
Register Transfer and Microoperations: Register Transfer Language, Bus and Memory Transfers, Arithmetic, Logic and Shift Microoperations.
Basic Computer Organization and Design: Stored Program Organization and Instruction Codes, Computer Registers, Computer Instructions, Timing and Control, Instruction Cycle, Memory-Reference Instructions, Input-Output, Interrupt.
Microprogrammed Control: Control Memory, Address Sequencing, Design of Control Unit.
Central Processing Unit: General Register Organization, Stack Organization, Instruction Formats, Addressing Modes, RISC Computer, CISC Computer.
Pipeline and Vector Processing: Parallel Processing, Pipelining, Arithmetic Pipeline, Instruction Pipeline, Vector Processing Array Processors.
Input-Output Organization: Peripheral Devices, Input-Output Interface, Asynchronous Data Transfer, Modes of Transfer, Priority Interrupt, DMA, Serial Communication.
Memory Hierarchy: Main Memory, Auxillary Memory, Associative Memory, Cache Memory, Virtual Memory, Memory Management Hardware.
Multiprocessors: Characteristics of Multiprocessors, Interconnection Structures, Interprocessor Arbitration, Interprocessor Communication and Synchronization, Cache Coherence, Multicore Processors.
Unit - 3: Programming Languages and Computer Graphics
Language Design and Translation Issues: Programming Language Concepts, Paradigms and Models, Programming Environments, Virtual Computers and Binding Times, Programming Language Syntax, Stages in Translation, Formal Transition Models.
Elementary Data Types: Properties of Types and Objects; Scalar and Composite Data Types.
Programming in C: Tokens, Identifiers, Data Types, Sequence Control, Subprogram Control, Arrays, Structures, Union, String, Pointers, Functions, File Handling, Command Line Argumaents, Preprocessors.
Object Oriented Programming: Class, Object, Instantiation, Inheritance, Encapsulation, Abstract Class, Polymorphism.
Programming in C++: Tokens, Identifiers, Variables and Constants; Data types, Operators, Control statements, Functions Parameter Passing, Virtual Functions, Class and Objects; Constructors and Destructors; Overloading, Inheritance, Templates, Exception and Event Handling; Streams and Files; Multifile Programs.
Web Programming: HTML, DHTML, XML, Scripting, Java, Servlets, Applets.
Computer Graphics: Video-Display Devices, Raster-Scan and Random-Scan Systems; Graphics Monitors, Input Devices, Points and Lines; Line Drawing Algorithms, Mid-Point Circle and Ellipse Algorithms; Scan Line Polygon Fill Algorithm, Boundary-Fill and Flood-Fill.
Unit – 4 : Database Management Systems
Database System Concepts and Architecture: Data Models, Schemas, and Instances; Three-Schema Architecture and Data Independence; Database Languages and Interfaces; Centralized and Client/Server Architectures for DBMS.
Data Modeling: Entity-Relationship Diagram, Relational Model - Constraints, Languages, Design, and Programming, Relational Database Schemas, Update Operations and Dealing with Constraint Violations; Relational Algebra and Relational Calculus; Codd Rules.
SQL: Data Definition and Data Types; Constraints, Queries, Insert, Delete, and Update Statements; Views, Stored Procedures and Functions; Database Triggers, SQL Injection.
Unit - 5 : System Software and Operating System
System Software: Machine, Assembly and High-Level Languages; Compilers and Interpreters; Loading, Linking and Relocation; Macros, Debuggers.
Basics of Operating Systems: Operating System Structure, Operations and Services; System Calls, Operating-System Design and Implementation; System Boot.
Unit – 6 : Software Engineering
Software Process Models: Software Process, Generic Process Model – Framework Activity, Task Set and Process Patterns; Process Lifecycle, Prescriptive Process Models.
Software Requirements: Functional and Non-Functional Requirements; Eliciting Requirements, Developing Use Cases, Requirement Analysis and Modelling; Requirements Review, Software Requirment and Specification (SRS) Document.
Unit – 7 : Data Structures and Algorithms
Data Structures: Arrays and their Applications; Sparse Matrix, Stacks, Queues, Priority Queues, Linked Lists, Trees, Forest, Binary Tree, Threaded Binary Tree, Binary Search Tree, AVL Tree, B Tree, B+ Tree, B* Tree, Data Structure for Sets, Graphs, Sorting and Searching Algorithms; Hashing.
Unit – 8 : Theory of Computation and Compilers
Theory of Computation: Formal Language, Non-Computational Problems, Diagonal Argument, Russels's Paradox.
Regular Language Models: Deterministic Finite Automaton (DFA), Non-Deterministic Finite Automaton (NDFA), Equivalence of DFA and NDFA, Regular Languages, Regular Grammars, Regular Expressions.
Unit – 9 : Data Communication and Computer Networks
Data Communication: Components of a Data Communication System, Simplex, Half-Duplex and Duplex Modes of Communication; Analog and Digital Signals.
Computer Networks: Network Topologies, Local Area Networks, Metropolitan Area Networks, Wide Area Network, Wireless Networks, Internet.
Network Models: Layered Architecture, OSI Reference Model and its Protocols; TCP/IP Protocol Suite.
Unit – 10 : Artificial Intelligence (AI)
Approaches to AI: Turing Test and Rational Agent Approaches; State Space Representation of Problems, Heuristic Search Techniques, Game Playing, Min-Max Search.
Knowledge Representation: Logic, Semantic Networks, Frames, Rules, Scripts, Conceptual Dependency and Ontologies; Expert Systems, Handling Uncertainty in Knowledge.
`;