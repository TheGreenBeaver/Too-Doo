import React from 'react';
import { useSelector } from 'react-redux';
import CenterBox from '../../components/center-box';
import Typography from '@mui/material/Typography';


function ErrorPage() {
  const error = useSelector(state => state.general.error);
  if (!error) {
    return null;
  }

  const { status, text } = error;

  return (
    <CenterBox height='100vh' flexDirection='column'>

      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox="0 0 423.33332 153.45834"
      >
        <g transform="translate(508.21279,-170.43862)">
          <g>
            <rect
              ry='0.0079374993'
              rx='0.0079374993'
              y='269.14627'
              x='-386.41171'
              height='3.725821'
              width='179.67798'
              fill='#000000'
            />
            <path
              style={{ fill: '#803300' }}
              d='m -386.69478,269.25804 h 180.2973 l -20.15759,-7.9592 h -139.98209 z'
            />
          </g>
          <g transform='translate(-2.7490234e-6)'>
            <rect
              style={{ fill: '#000000' }}
              width='262.07678'
              height='5.4344511'
              x='-427.61111'
              y='284.80554'
              rx='0.0079374993'
              ry='0.0079374993'
            />
            <path
              style={{ fill: '#803300' }}
              d='m -427.61111,284.80554 h 262.12997 l -20.15759,-7.9592 h -221.81476 z'
            />
          </g>
          <g transform='translate(-1.4704235)'>
            <rect
              ry='0.0079374993'
              rx='0.0079374993'
              y='315.69275'
              x='-504.83868'
              height='7.5088959'
              width='419.52597'
              style={{ fill: '#000000' }}
            />
            <path
              style={{ fill: '#803300' }}
              d='m -464.6487,299.82362 -20.15742,7.95922 -20.15741,7.9592 h 419.775647 l -20.157417,-7.9592 -20.15794,-7.95922 z'
            />
          </g>
          <g>
            <rect
              style={{ fill: '#000000' }}
              width='92.112976'
              height='1.9100641'
              x='-342.62921'
              y='256.76312'
              rx='0.0079374993'
              ry='0.0079374993' />
            <path
              style={{ fill: '#803300' }}
              d='m -333.30177,252.11948 -11.76052,4.64365 h 97.03232 l -11.76053,-4.64365 z'
            />
          </g>
          <g transform='translate(-1.789665)'>
            <g>
              <path
                style={{ fill: '#b3b3b3', stroke: '#000000', strokeWidth: 0.2808327 }}
                d='m -460.44223,308.94969 h 22.96235 l 116.41811,-56.70878 h -8.96819 z'
              />
              <rect
                style={{ fill: '#000000' }}
                width='22.962353'
                height='6.7923737'
                x='-460.4422'
                y='308.94968'
                rx='0.0079374993'
                ry='0.0079374993' />
              <path
                style={{ fill: '#000000' }}
                d='m -320.69056,252.11948 v 2.97866 l -116.78927,60.6439 v -6.79237 z'
              />
            </g>
            <g transform='matrix(-1,0,0,1,-589.51293,0)'>
              <path
                style={{ fill: '#b3b3b3', stroke: '#000000', strokeWidth: 0.28083274 }}
                d='m -460.44223,308.94969 h 22.96235 l 116.41811,-56.70878 h -8.96819 z'
              />
              <rect
                ry='0.0079374993'
                rx='0.0079374993'
                y='308.94968'
                x='-460.4422'
                height='6.7923737'
                width='22.962353'
                style={{ fill: '#000000' }}
              />
              <path
                d='m -320.69056,252.11948 v 2.97866 l -116.78927,60.6439 v -6.79237 z'
                style={{ fill: '#000000' }}
              />
            </g>
          </g>
          <g>
            <g transform='translate(7.1577045)'>
              <g>
                <path
                  style={{ fill: '#000000' }}
                  d='m -374.00631,232.21027 h 140.60497 l 14.64766,-3.19278 h -169.90031 z'
                  id='path866' />
                <rect
                  style={{ fill: '#ffffff', stroke: '#ff0000', strokeWidth: 1.32291663 }}
                  width='168.95537'
                  height='57.452389'
                  x='-388.18152'
                  y='171.13393'
                  rx='0.0079374993'
                  ry='0.0079374993' />
                <path
                  style={{ fill: '#ff0000' }}
                  d='m -388.1815,228.58632 31.95479,-57.4524 h 27.39788 l -31.95479,57.45239 z'
                />
                <path
                  style={{ fill: '#ff0000' }}
                  d='m -333.38573,228.58632 31.95478,-57.4524 h 27.39789 l -31.95479,57.45239 z'
                />
                <path
                  style={{ fill: '#ff0000' }}
                  d='m -278.58997,228.58632 31.95479,-57.4524 h 27.39788 l -31.95478,57.45239 z'
                />
              </g>
              <text
                y='223.18538'
                x='-355.12103'
                style={{ fontSize: 61.83347702, lineHeight: 1.25, fontFamily: 'Roboto', fill: '#000000' }}
                xmlSpace='preserve'
              >
                <tspan
                  style={{ strokeWidth: 3.86459231 }}
                  y='223.18538'
                  x='-355.12103'
                >
                  {status}
                </tspan>
              </text>
            </g>
            <g
              transform='translate(7.157705)'>
              <path
                d='m -362.01971,268.54249 -20.15761,7.9592 h 22.96235 l 13.4196,-11.10015 h -8.96819'
                style={{ fill: '#666666', stroke: '#000000', strokeWidth: 0.28083274 }}
              />
              <rect
                ry='0.0079374993'
                rx='0.0079374993'
                y='276.50168'
                x='-382.17728'
                height='6.7923737'
                width='22.962353'
                style={{ fill: '#000000' }}
              />
              <path
                d='m -345.42416,265.28011 v 2.97866 l -13.79076,15.03527 v -6.79237 z'
                style={{ fill: '#000000' }}
              />
              <path
                d='m -349.53758,268.54249 1.32208,-0.99106 v -35.32049 l -1.3221,-2.12763 z'
                style={{ fill: '#000000' }}
              />
              <path
                d='m -348.2155,267.55143 -1.32208,0.99106'
                style={{ fill: '#000000' }}
              />
              <rect
                ry='5.6843419e-14'
                rx='0.0079374993'
                y='230.39226'
                x='-362.02115'
                height='38.03159'
                width='12.234233'
                style={{ fill: '#666666', stroke: '#000000', strokeWidth: 0.54812652 }}
              />
            </g>
            <g transform='translate(7.157705)'>
              <path
                style={{ fill: '#666666', stroke: '#000000', strokeWidth: 0.28083274 }}
                d='m -245.38796,268.54249 20.15761,7.9592 h -22.96235 l -13.54258,-11.36342 h 8.96818'
              />
              <rect
                transform='scale(-1,1)'
                style={{ fill: '#000000' }}
                width='22.824442'
                height='7.1434145'
                x='225.23036'
                y='276.50168'
                rx='0.0079374993'
                ry='0.0079374993'
              />
              <path
                style={{ fill: '#000000', stroke: '#000000', strokeWidth: 0.28083274 }}
                d='m -261.98351,265.28011 v 2.97866 l 13.79076,15.03527 5e-5,-6.79235 z'
              />
              <path
                style={{ fill: '#000000' }}
                d='m -257.87009,268.54249 -1.32208,-0.99106 v -35.32049 l 1.3221,-2.12763 z'
              />
              <path
                style={{ stroke: '#000000', strokeWidth: 0.28083274 }}
                d='m -259.19217,267.55143 1.32208,0.99106'
              />
              <rect
                transform='scale(-1,1)'
                style={{ fill: '#666666', stroke: '#000000', strokeWidth: 0.54812652 }}
                width='12.234233'
                height='38.03159'
                x='245.38652'
                y='230.39226'
                rx='0.0079374993'
                ry='5.6843419e-14'
              />
            </g>
          </g>
          <path
            style={{ stroke: '#000000', strokeWidth: 0.28083274 }}
            d='m -295.88508,254.3908 -1.32209,0.99106'
          />
        </g>
      </svg>

      <Typography mt={5} variant='h1'>
        {text}
      </Typography>

    </CenterBox>
  );
}

export default ErrorPage;