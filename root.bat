::Pull from SPLYT_MAP
git clone https://github.com/chengyang9966/SPLYT_Map.git

::SPLYT_Map File 
cd SPLYT_Map 

::Fetch From Main Branch
git fetch origin main 

::Update and initialize all submodules source 
git submodule update --init --recursive 

:: Switch all submodules to master branch
:: git submodule foreach git checkout origin master

::Pull all submodules from master branch 
::git submodule foreach git pull origin master 



pause