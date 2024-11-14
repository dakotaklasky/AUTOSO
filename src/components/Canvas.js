import React,{useRef,useEffect} from 'react'

function Canvas({typeId,measurements}){
  
    function drawBackTop(ctx, multiplier){       
        const xLine3 = Number(measurements.L/2+0.5)
        const xLine1 = Number(xLine3-measurements.K/2-(3/8))
        const xLine2 = Number(xLine1 + Math.sqrt(Math.pow(measurements.J,2)-4))
        const xLine4 = Number(((xLine3-xLine1)/2)+xLine1)
    
        const yLine1 = Number(measurements.I/2 + 1.25)
        const yLine2 = Number((0.75*measurements.I)-(0.5*measurements.G)+0.625)
        
        ctx.beginPath()
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
    
    function drawFrontSkirt(ctx, multiplier){
        ctx.beginPath()
        ctx.moveTo(0,((measurements.B/4)+1)*multiplier)
        ctx.lineTo(7.125*multiplier,2*multiplier)
        ctx.lineTo(23.875*multiplier,0)
        ctx.lineTo(24.625*multiplier,(measurements.D/8 + 1.25)*multiplier)
        ctx.lineTo(24.625*multiplier,((measurements.D/4)+2.5)*multiplier)
        ctx.lineTo(0.625*multiplier,((measurements.D/4)+2.5)*multiplier)

        ctx.lineTo(0.625*multiplier, ((measurements.D/8)+2+(measurements.B/8))*multiplier)
        ctx.lineTo(4.625*multiplier,((measurements.D/8)+1.75+(measurements.B/8))*multiplier)
        ctx.lineTo(0.625*multiplier,((measurements.D/8)+1.5+(measurements.B/8))*multiplier)
        ctx.lineTo(0.625*multiplier, ((measurements.D/8)+2+(measurements.B/8))*multiplier)
        ctx.lineTo(0,((measurements.B/4)+1)*multiplier)
        ctx.stroke()
    }
   

    const canvasRef = useRef(null) // declare reference to canvas dom element and set its value to null

    let draw;

    if(typeId === "1"){
        draw = drawBackTop
    }
    else if(typeId === "2"){
        draw = drawPants
    }
    else if(typeId === "3"){
        draw = drawFrontSkirt
    }
        
    

    function clearCanvas(canvas, context){
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    useEffect(() => {
        const canvas = canvasRef.current //return the current value of the canvas ref aka null
        const context = canvas.getContext('2d') //need to create 2d context object to draw in the canvas (getcontext returns an object with methods for drawing)
        clearCanvas(canvas,context)
        draw(context, 35)
    })

    function printCanvas(canvasRef){
        const canvas = canvasRef.current
        if (!canvas) {
            console.error("Canvas element not found");
            return;
        }

        const dataUrl = canvas.toDataURL("image/png")
        const printWindow = window.open("","_blank")
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Canvas</title>
                </head>
                <body onload="window.print(); window.close();">
                    <img src="${dataUrl}" />
                </body>
            </html>
        `)
        printWindow.document.close();
    }

    return (
        <div>
        <canvas ref={canvasRef} width = '1000' height= '1000' />
        <button onClick = {() => printCanvas(canvasRef)}>Print Canvas</button>
        </div>
    )
}

export default Canvas;

