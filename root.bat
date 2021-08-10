::Pull from SPLYT_MAP
git clone https://github.com/chengyang9966/SPLYT_Map

::Root File 
cd root 

::Fetch From Main Branch
git fetch origin main 

::Update and initialize all submodules source 
git submodule update --init --recursive 

::Pull all submodules from master branch 
git submodule foreach git pull origin master 



pause