var x=$('#empty'), x_pos=''  , en_passant_w=0, en_passant_b=0, moves=[];
var turn=0;
var nextPosition='';
$(document).ready(function(){
	//highlighting the enterance in a cell
	$('td').mouseenter(function(){
		$(this).css('border','1px double black');
		$(this).parent().parent().css('background','black');
	});
	//removing the highlighting while leaving the cell
	$('td').mouseleave(function(){
		$(this).css('border','1px double grey');
		
	});
	//Selecting the promoted piece
	$('.next').click(function(){
		$('tr:nth-child('+parseInt(nextPosition[0])+') td:nth-child('+parseInt(nextPosition[1])+')').text($(this).text());
		$('#nextPieceModal,#contentBlack').css('display','none');
	});
	//function to determine valid moves
	function validMove(targetCell, position){
		var pr = parseInt(x_pos[0]); // var present_row = parseInt(x_pos[0]); 
		var pc = parseInt(x_pos[1]); // var present_column = parseInt(x_pos[1]);
		var tr = parseInt(position[0]); // var target_row = parseInt(position[0]);
		var tc = parseInt(position[1]); // var target_column = parseInt(position[1]);
		
		switch(x.text()[0]){
			//Pawn's move 
			case 's':
				var len=moves.length-1;
				if(pc===tc&&tr===1&&pr===2){
					$('#nextPieceModal,#contentBlack').css('display','block');
					nextPosition=position;
					return 1;
				}
				else if(((pc===tc)&&(pr===7&&((tr===6)||(tr===5))))||((pc===tc)&&(pr===(tr+1)))) return 1;
				else if((Math.abs(pc-tc)===1)&&(pr===(tr+1))&&(targetCell.text()!=='')) {return 1;}
				else if(moves[len][0]==='S'&&moves[len][2]==='2'&&moves[len][4]==='4'&&(Math.abs(pc-tc)===1)&&pr===4&&tr===3&&$('tr:nth-child(4) td:nth-child('+tc+')').text()!==''){
					$('tr:nth-child(4) td:nth-child('+tc+')').text('').attr('class','');
					console.log('en_passant');
					return 1;
				}
				else {alert('Invalid move'); return 0;}
				break;
			case 'S': 
				var len=moves.length-1;
				if(pc===tc&&tr===8&&pr===7){
					$('#nextPieceModal,#contentWhite').css('display','block');
					nextPosition=position;
					return 1;
				}
				else if(((pc===tc)&&(pr===2&&((tr===3)||(tr===4))))||((pc===tc)&&(pr===(tr-1)))) return 1;
				else if((Math.abs(pc-tc)===1)&&(pr===(tr-1))&&(targetCell.text()!=='')) {return 1;}
				else if(moves[len][0]==='s'&&moves[len][2]==='7'&&moves[len][4]==='5'&&(Math.abs(pc-tc)===1)&&pr===5&&tr===6&&$('tr:nth-child(5) td:nth-child('+tc+')').text()!==''){
					$('tr:nth-child(5) td:nth-child('+tc+')').text('').attr('class','');
					console.log('en_passant');
					return 1;
				}
				else {alert('Invalid move'); return 0;}
				break;
			//Rook's move
			case 'r' : 
			case 'R' : 
				if(pr===tr){
					//var col1=Math.max(pc,tc) , col2=Math.min(tc,pc);
					for(i=pc;Math.abs(tc-i)!==1;){
						pc > tc ? i-- : i++;
						if($('tr:nth-child('+pr+') td:nth-child('+i+')').text()!==''){alert('Invalid Move'); return 0;}
					}
					return 1;
				}
				else if(pc===tc){
					for(i=pr;Math.abs(tr-i)!==1;){
						pr > tr ? i-- : i++;
						if($('tr:nth-child('+i+') td:nth-child('+pc+')').text()!==''){alert('Invalid Move'); return 0;}
					}
					return 1;
				}
				else {alert('invalid Move'); return 0;}
				
				break;
			//Knight's move
			case 'N':
			case 'n': 
				if(((Math.abs(tr-pr)===1)&&(Math.abs(pc-tc)==2))||((Math.abs(tr-pr)===2)&&(Math.abs(pc-tc)==1))) return 1;
				else {alert('Invalid Move'); return 0;}
				break;
			//Bishop's move
			case 'b':
			case 'B':
				if((Math.abs(pc-tc))===(Math.abs(tr-pr))){
					for(i=pr,j=pc;Math.abs(tr-i)!==1;){
						pr > tr ? i-- : i++;
						pc > tc ? j-- : j++;
						if($('tr:nth-child('+i+') td:nth-child('+j+')').text()!==''){alert('Invalid Move'); return 0;}
					}
					return 1;
				}
				else {alert('Invalid Move');return 0;}
				break;
			//Queen's move
			case 'q':
			case 'Q':
				//Uses Bishop's move 
				if((Math.abs(pc-tc))===(Math.abs(tr-pr))){
					for(i=pr,j=pc;Math.abs(tr-i)!==1;){
						pr > tr ? i-- : i++;
						pc > tc ? j-- : j++;
						if($('tr:nth-child('+i+') td:nth-child('+j+')').text()!==''){alert('Invalid Move'); return 0;}
					}
					return 1;
				}
				//Uses Rook's move
				else if(pr===tr){
					for(i=pc;Math.abs(tc-i)!==1;){
						pc > tc ? i-- : i++;
						if($('tr:nth-child('+pr+') td:nth-child('+i+')').text()!==''){alert('Invalid Move'); return 0;}
					}
					return 1;
				}
				else if(pc===tc){
					for(i=pr;Math.abs(tr-i)!==1;){
						pr > tr ? i-- : i++;
						if($('tr:nth-child('+i+') td:nth-child('+pc+')').text()!==''){alert('Invalid Move'); return 0;}
					}
					return 1;
				}
				else {alert('Invalid Move');return 0;}
				break;
			//King's move
			case 'k':
			case 'K':
				var presentKing=x.text() , whichRook;
				if((tr===pr)&&(Math.abs(tc-pc)===1)) return 1;
				else if((tc===pc)&&(Math.abs(tr-pr)===1)) return 1;
				else if((Math.abs(tr-pr)===1)&&(Math.abs(tc-pc)===1)) return 1;
				else if((tr===pr)&&(pc===5)&&(tc===7||tc===3)){//Special move Castling
					//checking no pieces is present between king and rook
					if(tc>pc) whichRook='h';
					else whichRook='a';
					for(i=pc;;){
						pc > tc ? i--: i++;
						if(i===1||i==8)
							break;
						if($('tr:nth-child('+tr+') td:nth-child('+i+')').text()!=='')
							return 0;
						
					}
					//checking whether king or rook is moved before
					if(presentKing==='k'){
						for(i=0;i<moves.length;i++){
							if(moves[i][0]==='k'){
								console.log('moved king');
								return 0;
							}
							else if(moves[i][0]==='r'&&moves[i][1]===whichRook){
								console.log('moved Rook');
								return 0;
							}
						}
						$('tr:nth-child('+tr+') td:nth-child('+(pc > tc ? tc+1:tc-1 )+')').text($('tr:nth-child('+tr+') td:nth-child('+(whichRook.charCodeAt(0)-96)+')').text()).attr('class',x.attr('class')).css('color','black');
						$('tr:nth-child('+tr+') td:nth-child('+(whichRook.charCodeAt(0)-96)+')').attr('class','').text('');
						return 1;
					}
					else if(presentKing==='K'){
						for(i=0;i<moves.length;i++){
							if(moves[i][0]==='K'){
								console.log('moved king');
								return 0;
							}
							else if(moves[i][0]==='R'&&moves[i][1]===whichRook){
								console.log('moved Rook');
								return 0;
							}
						}
						$('tr:nth-child('+tr+') td:nth-child('+(pc > tc ? tc+1:tc-1 )+')').text($('tr:nth-child('+tr+') td:nth-child('+(whichRook.charCodeAt(0)-96)+')').text()).attr('class',x.attr('class')).css('color','black');
						$('tr:nth-child('+tr+') td:nth-child('+(whichRook.charCodeAt(0)-96)+')').attr('class','').text('');
						return 1;
					}
				}
				return 0;
				break;
		}
	}
	//function to decide turns 
	function findTurn(){ turn++; return turn%2 !==0 ? 1 : 0;}
	//choosing the cell
	//black pieces
	$(document.body).on('click','td.black',function(){
		var temp=$(this) ,temp_pos=($(this).parent().index()+1)+''+($(this).index()+1);
		if(x.text()===temp.text()){
			turn--;
			x.css('color',x.attr('class')==='white'?  '#F4F6F7' : 'black');
			x=$('#empty'); x_pos='';
			console.log('element deselected');
			return false;
		} 
		else if(findTurn()){ turn--; console.log('(black)Not your move now!');return false;}
		else if(x.text()===''){
			temp.css('color','#D68910');
			x=temp; x_pos=(temp.parent().index()+1)+''+(temp.index()+1);
			console.log('Black Selected');
		}
		else if(x.attr('class') === 'white'&&validMove(temp,temp_pos)){
			var tempMove=x.text()[0]+String.fromCharCode(parseInt(x_pos[1])+96)+x_pos[0]+''+String.fromCharCode(parseInt(temp_pos[1])+96)+temp_pos[0];
			moves.push(tempMove);
			var presentPiece=temp.text();
			turn--;
			temp.css('color',x.attr('class')==='white'?  '#F4F6F7' : 'black');
			temp.text(x.text()).attr('class','white');
			x.text('').attr('class','');
			x=$('#empty'); x_pos='';
			console.log("Move: "+tempMove+" White has taken a Black's piece");
			movesDisplay();
			if(presentPiece==='k'){
				alert('White Wins !!!!');
				if(confirm('Click ok to start a new game and cancel to exit the game.')){
					location.reload();
				}
				else{
					window.close();
					window.close();
				}
			}
		}
		
	});
	//white pieces
	$(document.body).on('click','td.white',function(){
		var temp=$(this) , temp_pos=($(this).parent().index()+1)+''+($(this).index()+1);
		if(x.text()===temp.text()){
			turn--;
			x.css('color',x.attr('class')==='white'?  '#F4F6F7' : 'black');
			x=$('#empty'); x_pos='';
			console.log('element deselected');
			return false;
		}
		else if(!findTurn()){turn--; console.log('(white) Not your move now!');return false;}
		else if(x.text()===''){
			temp.css('color','#D68910');
			x=temp; x_pos=(temp.parent().index()+1)+''+(temp.index()+1);
			console.log('White Selected');	
		}
		else if(x.attr('class') === 'black'&&validMove(temp,temp_pos)){
			var tempMove=x.text()[0]+String.fromCharCode(parseInt(x_pos[1])+96)+x_pos[0]+''+String.fromCharCode(parseInt(temp_pos[1])+96)+temp_pos[0];
			var presentPiece=temp.text();
			moves.push(tempMove);
			turn--;
			temp.css('color',x.attr('class')==='white'?  '#F4F6F7' : 'black');
			temp.text(x.text()).attr('class','black');
			x.text('').attr('class','');
			x=$('#empty'); x_pos='';
			console.log("Move: "+tempMove+" Black has taken a White's Piece");
			movesDisplay();
			if(presentPiece==='K'){
				alert('Black Wins !!!!');
				if(confirm('Click ok to start a new game and cancel to exit the game.')){
					location.reload();
				}
				else{
					window.close();
					window.close();
				}
			}
		}
		
	});
	//empty places
	$(document.body).on('click','td:not(.white,.black)',function(){
		var temp=$(this) , temp_pos=($(this).parent().index()+1)+''+($(this).index()+1);
		if((x.text()!=='')&&validMove(temp,temp_pos)){
			var tempMove=x.text()[0]+String.fromCharCode(parseInt(x_pos[1])+96)+x_pos[0]+''+String.fromCharCode(parseInt(temp_pos[1])+96)+temp_pos[0];
			moves.push(tempMove);
			console.log(x.attr("class")+' move is '+tempMove);
			temp.text(x.text()).attr('class',x.attr('class')).css('color',x.attr('class')==='white'?  '#F4F6F7' : 'black');
			x.text('').attr('class','');
			x=$('#empty'); x_pos='';
			movesDisplay();
		}
		else console.log('empty box');
	});
	//Displaying the moves
	const movesDisplay = () => {
		$('p').text('');
		for(i=0;i<moves.length;i++){
			document.getElementById('moves').innerHTML+=(i+1)+"."+moves[i]+'&nbsp;&nbsp;&nbsp;';
		}
	};
	$('#resign').click(function(){
		if(confirm('Do you really want to resign!')){
			turn%2!==0 ? alert('White wins!!'): alert('Black wins!!');
			if(confirm('Click ok to start a new game and cancel to exit the game.')){
				location.reload();
			}
			else{
				window.close();
				window.close();
			}
		}
	});
	$('#draw').click(function(){
		if(confirm('Do you wish to draw the match')) alert('Match is draw');
		if(confirm('Click ok to start a new game and cancel to exit the game.')){
				location.reload();
		}
		else{
				window.close();
				window.close();
		}
	});
 	//var upper= /^[A-Z0-9]+$/ ,lower=/^[a-z0-9]+$/;
});