import React,{useRef,useEffect} from 'react'

function Canvas({typeId}){
  
    function drawTop(ctx){
        //measurements
        const measurements = {
          A : Number(38.5),
          B : Number(30),
          C : Number(43),
          D : Number(45.5),
          E : Number(14),
          F : Number(13),
          G : Number(15),
          H : Number(16),
          I : Number(17),
          J : Number(3.75),
          K : Number(15),
          L : Number(18.25),
          M : Number(13),
          N : Number(8.25),
          O : Number(23.5),
          P : Number(15.5),
          Q : Number(12.5),
          R : Number(10),
          S : Number(6.25)
        }
    
        const multiplier = 35        
        const xLine3 = Number(measurements.L/2+0.5)
        const xLine1 = Number(xLine3-measurements.K/2-(3/8))
        const xLine2 = Number(xLine1 + Math.sqrt(Math.pow(measurements.J,2)-4))
        const xLine4 = Number(((xLine3-xLine1)/2)+xLine1)
    
        const yLine1 = Number(measurements.I/2 + 1.25)
        const yLine2 = Number((0.75*measurements.I)-(0.5*measurements.G)+0.625)
        
          ctx.moveTo(0, yLine1*multiplier);  //armhole
          ctx.lineTo(xLine1*multiplier,yLine2*multiplier)
          ctx.lineTo(xLine1*multiplier,2*multiplier)
          ctx.lineTo(xLine2*multiplier,0) //shoulder 2
          ctx.lineTo(xLine3*multiplier,(measurements.I-measurements.G)*multiplier) //back center (curve)
          ctx.lineTo(xLine3*multiplier,measurements.I*multiplier) //waist center
          ctx.moveTo(xLine4*multiplier,yLine1*multiplier) //dart point
          ctx.lineTo((xLine4+0.75)*multiplier,measurements.I*multiplier) //right dart bottom
          ctx.moveTo(xLine4*multiplier,yLine1*multiplier) //dart point
          ctx.lineTo((xLine4-0.75)*multiplier,measurements.I*multiplier) //left dart bottom
          ctx.moveTo(xLine3*multiplier,measurements.I*multiplier) //waist center
          ctx.lineTo((xLine4-0.75)*multiplier,measurements.I*multiplier) //left dart bottom
          
          const a = Number((measurements.I/2)-1.25)
          const b = Number(xLine3-(measurements.B/4)-1.75)
    
          const x = Number((measurements.N*b/Math.sqrt(Math.pow(a,2)+Math.pow(b,2)))-b)
          const y = Number((measurements.N*a/Math.sqrt(Math.pow(a,2)+Math.pow(b,2)))-a)
          ctx.lineTo((b+x)*multiplier,(measurements.I+y)*multiplier) //bottom side
          ctx.lineTo(0, yLine1*multiplier); // back to underwarm
          ctx.stroke();
          //add curves
      }
    
   
    function drawPants(ctx){
            ctx.beginPath();
            ctx.arc(100, 75, 50, 0, 2 * Math.PI);
            ctx.stroke();
        }
   

    const canvasRef = useRef(null) // get dom element in order to get its context object so we can draw in canvas

    let draw;

    if(typeId === "1"){
        draw = drawTop
    }
    else(
        draw = drawPants
    )

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        draw(context)
    }, [draw])    

    return <canvas ref={canvasRef} width = '1000' height= '1000' />
}

export default Canvas;