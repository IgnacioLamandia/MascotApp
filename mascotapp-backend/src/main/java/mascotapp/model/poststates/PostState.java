package mascotapp.model.poststates;

public enum PostState {
	
	/*
	0- New (avanza a 1)
	1- Request (avanza a 2 o vuelve a 0)
	2- RequestConfirmed (avanza a 3) 
	3- Collect (avanza a 4 o vuelve a 0)
	4- CollectDone (FINALIZA)
	*/

	 New,
	 Request,
	 RequestConfirmed,
	 Collect, 
	 CollectDone 
}